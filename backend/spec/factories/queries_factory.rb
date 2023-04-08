# frozen_string_literal: true

# define factory for Query model
FactoryBot.define do
  factory :query do
    title { Faker::Lorem.sentence }
    selector_regex { Faker::Lorem.sentence }
    slug { Faker::Lorem.sentence }
    association :account, factory: :account
  end
end
