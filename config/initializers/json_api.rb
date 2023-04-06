# frozen_string_literal: true

JSONAPI.configure do |config|
  config.json_key_format = :camelized_key
  config.route_format = :camelized_route
  config.resource_key_type = :uuid
  config.resource_cache = Rails.cache
  config.default_caching = true
  config.default_resource_cache_field = :updated_at
end
