# frozen_string_literal: true

class RegexExtractorGenerator
  attr_reader :ai_client

  def initialize
    @ai_client = AI::Client.new
  end

  def generate(log:, properties:)
    prompter = Prompter.new(example_file: Rails.root.join('data/prompts/regex_extractor_examples.json'))

    prompt = prompter.generate(log:, properties:) do |example|
      <<~PROMPT
        input: extract properties [#{example[:properties]}] from the log [#{example[:log]}]
        answer: #{example[:regex]}
      PROMPT
    end

    ai_client.complete(prompt:, max_tokens: 400, temperature: 0)
  end
end
