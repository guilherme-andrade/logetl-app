# frozen_string_literal: true

module API
  class MemberResource < ApplicationResource
    has_one :account
    has_one :user
  end
end
