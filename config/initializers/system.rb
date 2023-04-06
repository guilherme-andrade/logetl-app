# frozen_string_literal: true

require 'dry-rails'
require 'dry-validation'

Dry::Rails.container do
  config.component_dirs.add 'app/use_cases'
  config.component_dirs.add 'app/services'
end
