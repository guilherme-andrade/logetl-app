# frozen_string_literal: true

module AI
  class Prompter
    def initialize(example_file:)
      @example_file = example_file
    end

    def generate(example)
      examples = JSON.parse(File.read(@example_file))
      examples.push(example).map { |example| yield(example.with_indifferent_access) }.join("\n")
    end
  end
end
