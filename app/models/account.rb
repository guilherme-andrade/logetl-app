class Account < ApplicationRecord
  acts_as_tenant(:account)

  has_many :members, dependent: :destroy
  has_many :users, through: :members
end
