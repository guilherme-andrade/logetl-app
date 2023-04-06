# frozen_string_literal: true

FactoryBot.define do
  factory :logfile do
    title { Faker::Lorem.sentence }
    slug { Faker::Lorem.sentence }
    association :account, factory: :account
  end
end
