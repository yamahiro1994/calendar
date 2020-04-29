Rails.application.routes.draw do
  root 'events#rrule'

  namespace :api, { format: 'json' } do
    namespace :v1 do
        resources :events
    end
  end
end
