# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  devise_for :users, path: '/user', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    sign_up: 'signup'
  }

  root to: redirect("http://#{ENV.fetch('NEXT_HOST', 'localhost')}:4000")

  get 'up' => 'rails/health#show', as: :rails_health_check
  namespace :api, defaults: { format: :json } do
    resource :counter, only: %i[create show destroy]
    resource :validation, only: [:show]
  end

  # Defines the root path route ("/")
end
