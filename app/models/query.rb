# frozen_string_literal: true

class Query < ApplicationRecord
  acts_as_tenant :account
end
