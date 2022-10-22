Rails.application.routes.draw do
  devise_for :users
  devise_for :admins, controllers: {
    sessions: 'admins/sessions'
  }

  namespace :admins do
    get    '/',        to: 'home#index'
    resources :users
  end
  mount Sidekiq::Web => '/sidekiq'

  get 'home/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
end
