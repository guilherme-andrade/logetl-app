class User < ApplicationRecord
  has_many :memberships, dependent: :destroy, class_name: 'Member'
  has_many :accounts, through: :memberships

  acts_as_tenant :account, through: :memberships

  has_secure_password
end
