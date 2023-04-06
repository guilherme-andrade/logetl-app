# frozen_string_literal: true

module API
  class UserResource < ApplicationResource
    attributes :email, :first_name, :last_name, :password, :username, :slug, :created_at, :updated_at

    def self.updatable_fields(context)
      super - [:password]
    end

    def self.creatable_fields(context)
      super - [:slug]
    end

    def self.sortable_fields(context)
      super - [:password]
    end

    def self.filterable_fields(context)
      super - [:password]
    end

    def self.searchable_fields(context)
      super - [:password]
    end
  end
end
