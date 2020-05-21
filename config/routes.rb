Rails.application.routes.draw do
  devise_for :users
  root 'events#index'
  post "/" => "events#create"
  # root 'rooms#show'
  get 'rooms/show'

  resources :events

  resources :users, only: [:edit, :update, :destroy]

end
