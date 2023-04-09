# frozen_string_literal: true

class User < ApplicationRecord
  include Slugged

  has_many :memberships, dependent: :destroy, class_name: 'Member'
  has_many :accounts, through: :memberships

  has_secure_password

  slug :full_name

  def full_name
    "#{first_name} #{last_name}"
  end
end
