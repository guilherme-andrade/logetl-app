use std::env;
use std::fs::File;
use std::io::{BufRead, BufReader};
use reqwest::blocking::{Client, RequestBuilder};
use regex::Regex;
extern crate serde;
#[macro_use] extern crate serde_derive;

#[derive(Debug, Deserialize)]

struct Query {
    selectorRegex: String,
    url: String,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = env::args().collect();
    let log_file_path = &args[1];

    let api_host = env::var("LOGETL_API_URL").unwrap();
    let authorization = env::var("LOGETL_API_TOKEN").unwrap();
    let api_url = format!("{}/api/queries", api_host);

    let queries = get_queries(&api_url, &authorization)?;

    let log_file = File::open(log_file_path)?;
    let log_reader = BufReader::new(log_file);

    for line in log_reader.lines() {
        let log = line?;

        for query in queries.iter() {
            let re = Regex::new(&query.selectorRegex)?;
            if re.is_match(&log) {
                let client = Client::new();
                let request = client.post(&query.url)
                    .header("Authorization", authorization.clone())
                    .body(log.clone());
                make_api_call(request)?;
            }
        }
    }

    Ok(())
}

fn get_queries(api_url: &str, authorization: &str) -> Result<Vec<Query>, Box<dyn std::error::Error>> {
    let client = Client::new();
    let response = client.get(api_url)
        .header("Authorization", authorization)
        .send()?;
    let queries = response.json()?;

    Ok(queries)
}

fn make_api_call(request: RequestBuilder) -> Result<(), Box<dyn std::error::Error>> {
    let response = request.send()?;
    if !response.status().is_success() {
        eprintln!("API request failed: {:?}", response.status());
    }

    Ok(())
}
