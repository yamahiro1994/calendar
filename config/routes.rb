Rails.application.routes.draw do
  devise_for :users
  root 'events#index'

  namespace :api, { format: 'json' } do
    resources :events
  end

  resources :events
  resources :users, only: [:edit, :update, :destroy]

end
