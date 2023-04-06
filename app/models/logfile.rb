class Logfile < ApplicationRecord
  acts_as_tenant :account

  has_one_attached :file
end
