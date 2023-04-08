# frozen_string_literal: true

FactoryBot.define do
  factory :trigger do
    title { Faker::Lorem.sentence }
    extractor_regex { Faker::Lorem.sentence }
    slug { Faker::Lorem.sentence }
    query { association(:query) }
    association :account, factory: :account
  end
end
