use std::process::{Command, Stdio};
use std::error::Error;

pub fn spawn_process(args: &[String]) -> Result<Command, Box<dyn Error>> {
  let cmd = match args.get(1) {
      Some(arg) if arg == "--container" => {
          let container_arg = args.get(2).expect("Missing container argument");
          let mut cmd = Command::new("docker");
          cmd.arg("logs").arg(container_arg).arg("--follow");
          cmd
      }
      Some(arg) if arg == "--file" => {
          let file_arg = args.get(2).expect("Missing file argument");
          let mut cmd = Command::new("tail");
          cmd.arg("-n").arg("100000").arg("-f").arg(file_arg);
          cmd
      }
      _ => {
          return Err("Invalid arguments".into());
      }
  };

  return Ok(cmd);
}
