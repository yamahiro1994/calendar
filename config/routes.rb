Rails.application.routes.draw do
  devise_for :users
  root 'events#index'
  # devise_scope :user do
    # get "sign_in", to: "users/sessions#new"
    # get "sign_out", to: "users/sessions#destroy"
    # delete "logout", :to => "users/sessions#destroy"
  # end

  resources :events
  resources :users, only: [:edit, :update, :destroy]

end
