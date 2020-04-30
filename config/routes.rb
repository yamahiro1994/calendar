Rails.application.routes.draw do
  root 'events#index'
  resources :events

  namespace :api, { format: 'json' } do
    namespace :v1 do
        resources :events
    end
  end
end
