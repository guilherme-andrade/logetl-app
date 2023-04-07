# frozen_string_literal: true

class Query < ApplicationRecord
  acts_as_tenant :account

  has_many :triggers, dependent: :destroy
end
