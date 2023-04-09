# frozen_string_literal: true

class RegexSelectorGenerator
  attr_reader :ai_client

  def initialize
    @ai_client = AI::Client.new
  end

  def generate(log:, log_list:)
    prompter = AI::Prompter.new(example_file: Rails.root.join('data/prompts/regex_selector_examples.json'))

    prompt = prompter.generate(log: log, log_list: log_list) do |example|
      <<~PROMPT
        input: output a regex to match log [#{example[:log]}] from list [#{example[:log_list].join('|')}]
        answer: #{example[:regex]}
      PROMPT
    end

    ai_client.complete(prompt: prompt, max_tokens: 400, temperature: 0)
  end
end
