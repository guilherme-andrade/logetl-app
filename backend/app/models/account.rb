# frozen_string_literal: true

class Account < ApplicationRecord
  include Slugged

  has_many :members, dependent: :destroy
  has_many :users, through: :members

  slug :name
end
