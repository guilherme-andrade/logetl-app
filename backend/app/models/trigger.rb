# frozen_string_literal: true

class Trigger < ApplicationRecord
  include Slugged

  acts_as_tenant :account

  belongs_to :query

  slug :title
end
