Rails.application.routes.draw do
  root to: 'pages#home'

  resources :sessions, only: %i[create]
end
