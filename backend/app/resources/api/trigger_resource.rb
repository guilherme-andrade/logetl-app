# frozen_string_literal: true

module API
  class TriggerResource < ApplicationResource
    attributes :title, :extractor_regex, :slug, :created_at, :updated_at

    has_one :query
  end
end
