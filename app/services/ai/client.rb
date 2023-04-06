require "openai"

module AI
  class Client
    def initialize
      @client = OpenAI::Client.new(api_key: ENV["OPENAI_API_KEY"])
    end

    def complete(prompt:, max_tokens: 100, temperature: 0.5, top_p: 1, frequency_penalty: 0, presence_penalty: 0, stop: ["\n"])
      @client.completions(
        engine: "davinci",
        prompt: prompt,
        max_tokens: max_tokens,
        temperature: temperature,
        top_p: top_p,
        frequency_penalty: frequency_penalty,
        presence_penalty: presence_penalty,
        stop: stop
      ).choices.first.text
    end
  end
end
