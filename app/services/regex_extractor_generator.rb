# frozen_string_literal: true

class RegexExtractorGenerator
  attr_reader :ai_client

  def initialize
    @ai_client = AI::Client.new
  end

  def generate(log:, properties:)
    prompt = Prompt.new(log: log, properties: properties).to_s

    ai_client.complete(prompt: prompt, max_tokens: 400, temperature: 0)
  end

  class Prompt
    attr_reader :log, :properties

    def initialize(log:, properties:)
      @log = log
      @properties = properties
    end

    def to_s
      examples_with_prompt = examples.push(log: log, properties: properties)
      examples_with_prompt.map { |example| format_example(example) }.join("\n")
    end

    def examples
      [
        {
          log: 'GET /api/v1/users/1 HTTP/1.1',
          properties: ['user_id'],
          regex: 'GET /api/v1/users/(?<user_id>\\d+) HTTP/1.1'
        },
        {
          log: 'GET /api/v1/users/1 HTTP/1.1',
          properties: %w[user_id http_version],
          regex: 'GET /api/v1/users/(?<user_id>\\d+) HTTP/(?<http_version>\\d\\.\\d)'
        },
        {
          log: 'POST /api/v1/service_offfers/1/accept/2 body={"user_id": 1}',
          properties: %w[user_id service_offer_id],
          regex: 'POST /api/v1/service_offfers/(?<service_offer_id>\\d+)/accept/(?<user_id>\\d+) body={"user_id": 1}'
        },
        {
          log: 'POST /api/v1/service_offfers/1/accept/2 body={"user_id": 1} ip=172.453.232.1 user_agent=Chrome/1.0',
          properties: %w[user_id service_offer_id ip user_agent],
          regex: 'POST /api/v1/service_offfers/(?<service_offer_id>\\d+)/accept/(?<user_id>\\d+) body={"user_id": 1} ip=(?<ip>\\d+\\.\\d+\\.\\d+\\.\\d+) user_agent=(?<user_agent>\\w+\\/\\d\\.\\d)'
        }
      ]
    end

    def format_example(example)
      <<~PROMPT
        input: extract properties [#{example[:properties]}] from the log [#{example[:log]}]
        answer: #{example[:regex]}
      PROMPT
    end
  end
end
