# frozen_string_literal: true

module API
  class AccountResource < ApplicationResource
    attributes :name, :slug, :created_at, :updated_at
  end
end
