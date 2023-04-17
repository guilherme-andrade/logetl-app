# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :sessions, only: %i[create]

    jsonapi_resources :accounts
    jsonapi_resources :members
    jsonapi_resources :users
    jsonapi_resources :logfiles
    jsonapi_resources :triggers
    jsonapi_resources :queries do
      scope module: 'queries' do
        jsonapi_resources :matches, only: %i[create]
      end
    end
  end

  namespace :ai, defaults: { format: :json } do
    namespace :api do
      resources :regex_selectors, only: %i[create]
      resources :regex_extractions, only: %i[create]
    end
  end
end
