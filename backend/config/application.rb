# frozen_string_literal: true

require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_mailbox/engine'
require 'action_text/engine'
require 'action_view/railtie'
require 'action_cable/engine'

Bundler.require(*Rails.groups)

module LogetlApp
  class Application < Rails::Application
    config.load_defaults 7.0
    config.generators.system_tests = nil
    config.generators { |g| g.orm :active_record, primary_key_type: :uuid }

    config.lograge.enabled = true

    config.lograge.custom_options = lambda do |event|
      exceptions = %w[controller action format id]
      {
        params: event.payload[:params].except(*exceptions),
        time: event.time
      }
    end

    excluded_routes = ->(env) { !env['PATH_INFO'].match(/api/) }
    config.middleware.use OliveBranch::Middleware,
                          inflection: 'camel',
                          exclude_params: excluded_routes,
                          exclude_response: excluded_routes
  end
end
