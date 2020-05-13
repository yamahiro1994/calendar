Rails.application.routes.draw do
  devise_for :users
  root 'events#index'
  post "/" => "events#create"

  resources :events

  resources :users, only: [:edit, :update, :destroy]

end
