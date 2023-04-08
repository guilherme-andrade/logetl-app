# frozen_string_literal: true

FactoryBot.define do
  factory :member do
    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    association :account, factory: :account
  end
end
