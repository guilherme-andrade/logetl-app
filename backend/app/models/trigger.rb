# frozen_string_literal: true

class Trigger < ApplicationRecord
  acts_as_tenant :account

  belongs_to :query
end
