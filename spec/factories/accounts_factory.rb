# frozen_string_literal: true

FactoryBot.define do
  factory :account do
    name { Faker::Company.name }
    subdomain { Faker::Internet.domain_word }
  end
end
