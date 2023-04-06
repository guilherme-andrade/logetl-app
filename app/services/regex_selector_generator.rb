# frozen_string_literal: true

class RegexSelectorGenerator
  attr_reader :ai_client

  def initialize
    @ai_client = AI::Client.new
  end

  def generate(log:)
    prompt = Prompt.new(log: log).to_s

    ai_client.complete(prompt: prompt, max_tokens: 400, temperature: 0)
  end

  class Prompt
    attr_reader :log

    def initialize(log:)
      @log = log
    end

    def to_s
      examples_with_prompt = examples.push(log: log)
      examples_with_prompt.map { |example| format_example(example) }.join("\n")
    end

    # in this example, we want to pass a list of logs, and a log to extract from the list.
    # the goal is to extract the regex that matches the log from the list.
    def examples
      [
        {
          log: 'GET /api/v1/users/1 HTTP/1.1',
          log_list: ['GET /api/v1/users/1 HTTP/1.1', 'GET /api/v1/users/2 HTTP/1.1', 'GET /homes/3 HTTP/1.1'],
          regex: "GET /api/v1/users/\d+\s.+"
        },
        {
          log: 'GET /api/v1/service_offfers/1/accept/2 HTTP/1.1',
          log_list: ['GET /api/v1/service_offfers/1/accept/2 HTTP/1.1', 'GET /api/v1/users/2 HTTP/1.1',
                     'GET /homes/3 HTTP/1.1', 'GET /api/v1/service_offfers/1/accept/3 HTTP/1.1 ip=172.453.232.1 user_agent=Chrome/1.0'],
          regex: "GET /api/v1/service_offfers/\d+/accept/\d+\s.+"
        }
      ]
    end

    def format_example(example)
      <<~PROMPT
        input: extract log [#{example[:log]}] from [#{example[:log_list].join('|')}]
        answer: #{example[:regex]}
      PROMPT
    end
  end
end
