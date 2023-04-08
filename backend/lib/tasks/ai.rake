namespace :ai do
  task fake_logs: :environment do
    require 'openai'

    # List of languages/frameworks to generate logs for
    languages = ["Ruby on Rails", "Python Django", "Node.js", "Java Spring Boot", "PHP Laravel", "ASP.NET"]

    # Create a client using the OpenAI API key
    client = AI::Client.new

    # Iterate over each language and generate logs using the OpenAI API
    languages.each do |lang|
      # Set the prompt for the OpenAI API request
      prompt = "Generate random application logs that look real and sequenced logically for a web server in #{lang}.\nMake sure the log examples include different kinds of requests with higher degrees of complexity, including different request methods and param types.\n AI:"

      # Generate logs using the OpenAI API
      response = client.complete(prompt: prompt)

      text = response

      # Write the response to a file named after the language
      file_name = Rails.root.join("data/fake_logs/#{lang.underscore.gsub(/\s+/, '_')}.txt")
      File.write(file_name, response.strip)
    end
  end
end
