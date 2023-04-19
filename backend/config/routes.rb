# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :sessions, only: %i[create], path: 'login'

    jsonapi_resources :accounts
    jsonapi_resources :members
    jsonapi_resources :users
    jsonapi_resources :logfiles
    jsonapi_resources :triggers
    jsonapi_resources :matches, only: %i[create]
    jsonapi_resources :queries
  end

  namespace :ai, defaults: { format: :json } do
    namespace :api do
      resources :regex_selectors, only: %i[create]
      resources :regex_extractions, only: %i[create]
    end
  end
end
