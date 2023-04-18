use dotenv::dotenv;
use fancy_regex::Regex;
use redis::Commands;
use reqwest;
use reqwest::blocking::{Client, ClientBuilder, RequestBuilder};
use reqwest::header::{self, AUTHORIZATION, CONTENT_TYPE, ACCEPT};
use serde_json::{Map, Value};
use std::io::{BufRead, BufReader};
use std::net::{Ipv4Addr, SocketAddr, SocketAddrV4};
use std::{env, process};

mod lib {
    pub mod process_spawner;
}

use lib::process_spawner::spawn_process;

extern crate serde;
#[macro_use]
extern crate serde_derive;

#[derive(Debug, Deserialize, Serialize)]
struct Query {
    id: String,
    #[serde(rename = "type")]
    query_type: String,
    links: Links,
    attributes: Attributes,
    relationships: Option<Relationships>,
}

#[derive(Debug, Deserialize, Serialize)]
struct Links {
    #[serde(rename = "self")]
    self_link: Option<String>,
    related: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
struct Attributes {
    title: String,
    selectorRegex: String,
    logExample: String,
    slug: String,
    createdAt: String,
    updatedAt: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Triggers {
    links: Links,
}

#[derive(Debug, Deserialize, Serialize)]
struct Relationships {
    triggers: Triggers,
}

#[derive(Debug, Deserialize, Serialize)]
struct QueryResponse {
    data: Vec<Query>,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let args: Vec<String> = env::args().collect();
    let mut cmd = spawn_process(&args)?;

    let redis_url = env::var("REDIS_URL").unwrap_or_else(|_| "redis://127.0.0.1/".to_string());

    let api_host = get_api_host();

    let queries = get_queries()?;

    let mut last_line = String::new();

    let client = redis::Client::open(redis_url)?;
    let mut con = client.get_connection()?;

    if let Ok(redis::Value::Data(_)) = con.get::<&str, redis::Value>("logetl:last_processed_line") {
        last_line = con.get("logetl:last_processed_line")?;
    }

    loop {
        let tail_child = cmd.stdout(process::Stdio::piped()).spawn().unwrap();
        let reader = BufReader::new(tail_child.stdout.unwrap());

        for line in reader.lines() {
            let line = remove_formatting_tags(&line.unwrap());

            last_line = line.to_string();

            for query in &queries {
                let mut regex_string = query.attributes.selectorRegex.clone();
                regex_string.remove(0);
                regex_string.remove(regex_string.len() - 1);

                let re = Regex::new(&regex_string)?;

                if re.is_match(&last_line)? {
                    let client = create_client()?;
                    let mut body_map = Map::new();
                    let mut data = Map::new();
                    let mut attributes  = Map::new();
                    attributes.insert(String::from("queryId"), Value::String(query.id.clone()));
                    attributes.insert(String::from("log"), Value::String(last_line.clone()));
                    data.insert(String::from("attributes"), Value::Object(attributes));
                    data.insert(String::from("type"), Value::String(String::from("matches")));
                    body_map.insert(String::from("data"), Value::Object(data));
                    let body = serde_json::to_string(&body_map).unwrap();
                    let request = client
                        .post(format!("{}/api/matches", api_host))
                        .body(body.clone());

                    make_api_call(request)?;
                }
            }
        }
        con.set("logetl:last_processed_line", &last_line)?;
    }
}

fn remove_formatting_tags(input_str: &str) -> String {
    let re = Regex::new("\u{001B}\\[(\\d{1,2}(;\\d{1,2})?)?[m|K]").unwrap();
    re.replace_all(input_str, "").to_string()
}

fn exit_with_error(error: &str) -> String {
    eprintln!("{}", &error);
    process::exit(1);
}

fn get_queries() -> Result<Vec<Query>, Box<dyn std::error::Error>> {
    let client = create_client()?;
    let api_host = get_api_host();
    let queries_url = format!("{}/api/queries", api_host);
    let response = client.get(queries_url).send()?;
    let queries_text = response.text()?;
    let queries_response = serde_json::from_str::<QueryResponse>(&queries_text).unwrap();

    Ok(queries_response.data)
}

fn create_client() -> Result<Client, Box<dyn std::error::Error>> {
    let authorization = env::var("LOGETL_API_TOKEN")
        .unwrap_or_else(|_| exit_with_error("LOGETL_API_TOKEN is not set"));
    let mut headers = header::HeaderMap::new();
    headers.insert(
        AUTHORIZATION,
        reqwest::header::HeaderValue::from_str(&authorization)?,
    );
    headers.insert(
        CONTENT_TYPE,
        reqwest::header::HeaderValue::from_static("application/vnd.api+json")
    );
    let api_host = get_api_host();
    let addr = SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 4000));
    let client = ClientBuilder::new()
        .gzip(true)
        .trust_dns(false)
        .resolve(&api_host, addr)
        .default_headers(headers)
        .build()?;

    Ok(client)
}

fn get_api_host() -> String {
    env::var("LOGETL_API_HOST").unwrap_or_else(|_| exit_with_error("LOGETL_API_URL is not set"))
}

fn make_api_call(request: RequestBuilder) -> Result<(), Box<dyn std::error::Error>> {
    let response = request.send()?;
    if !response.status().is_success() {
        eprintln!("API request failed: {:?}", response.status());
    }

    Ok(())
}
