# frozen_string_literal: true

module API
  class QueryResource < ApplicationResource
    attributes :title, :selector_regex, :slug, :created_at, :updated_at

    has_many :triggers
  end
end
