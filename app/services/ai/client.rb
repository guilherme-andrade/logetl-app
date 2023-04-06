# frozen_string_literal: true

require 'openai'

module AI
  class Client
    def initialize
      @client = OpenAI::Client.new(api_key: ENV['OPENAI_API_KEY'])
    end

    def complete(**options)
      @client.completions(engine: 'gpt-3.5-turbo', **options).choices.first.text
    end
  end
end
