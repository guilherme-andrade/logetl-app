# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors, debug: !Rails.env.production?, logger: (lambda {
  Rails.logger
}) do
  allow do
    origins '*'
    resource '*', headers: :any, methods: %i[get post patch delete options]
  end
end
