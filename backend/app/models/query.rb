# frozen_string_literal: true

class Query < ApplicationRecord
  include Slugged

  acts_as_tenant :account

  has_many :triggers, dependent: :destroy
  has_many :matches, dependent: :destroy

  slug :title
end
