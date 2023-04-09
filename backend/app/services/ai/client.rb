# frozen_string_literal: true

require 'openai'

module AI
  class Client
    def initialize
      @client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
    end

    def complete(**options)
      response = @client.completions(parameters: default_options.merge(options))

      raise 'No response from OpenAI' if response['choices'].empty? || response['choices'].first['text'].blank?

      response['choices'].first['text']
    end

    def default_options
      {
        model: 'text-davinci-003',
        max_tokens: 4000,
        temperature: 1,
        top_p: 1,
        stop: ['AI:']
      }
    end
  end
end
