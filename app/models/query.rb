class Query < ApplicationRecord
  acts_as_tenant :account
end
