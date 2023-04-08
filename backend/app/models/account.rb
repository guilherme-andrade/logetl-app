# frozen_string_literal: true

class Account < ApplicationRecord
  has_many :members, dependent: :destroy
  has_many :users, through: :members
end
