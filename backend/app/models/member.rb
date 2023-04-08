# frozen_string_literal: true

class Member < ApplicationRecord
  acts_as_tenant :account

  rolify
  belongs_to :user
end
