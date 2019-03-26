Rails.application.routes.draw do
  get '/users', to: 'users#index'
  get '/courts', to: 'courts#index'
  post '/courts', to: 'courts#create'
  get '/games', to: 'games#index'
  post '/games', to: 'games#create'
  delete '/courts/:id', to: 'courts#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
