Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions:      'users/sessions'
  }
  devise_scope :user do
    get "sign_in", to: "users/sessions#new"
    get "sign_out", to: "users/sessions#destroy"
  end
  root 'events#index'
  resources :events
  resources :users, only: [:edit, :update, :destroy]
  # namespace :api, { format: 'json' } do
  #   namespace :v1 do
  #       resources :events
  #   end
  # end
end
