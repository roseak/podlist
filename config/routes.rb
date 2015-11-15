Rails.application.routes.draw do
  root 'welcome#index'
  get '/auth/twitter', as: :login
  get '/auth/twitter/callback', to: 'sessions#create'
  delete '/logout', as: :logout, to: 'sessions#destroy'
  get '/home', to: 'home#index'
  resources :playlists, only: [:index, :show, :update, :destroy]
  resources :users, only: [:index, :show]
  resources :shows, only: [:show]
end
