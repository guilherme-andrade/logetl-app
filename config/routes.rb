# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'pages#home'

  namespace :api, defaults: { format: :json } do
    resources :sessions, only: %i[create]

    jsonapi_resources :accounts
    jsonapi_resources :members
    jsonapi_resources :users
    jsonapi_resources :queries
    jsonapi_resources :logfiles
    jsonapi_resources :triggers
  end
end
