class Prompter
  def initialize(example_file:)
    @example_file = example_file
  end

  def generate(example, &block)
    examples = JSON.parse(File.read(@example_file))
    examples.push(example).map { |example| block.call(example) }.join("\n")
  end
end
