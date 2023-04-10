# frozen_string_literal: true

class Logfile < ApplicationRecord
  include Slugged

  acts_as_tenant :account

  has_one_attached :file

  slug :name
end
