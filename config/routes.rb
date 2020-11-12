Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  root to: 'library#index'

  post '/graphql', to: 'graphql#execute'

  get 'spa', to: 'general#spa'
  get 'spa/*path', to: 'general#spa'
  get 'apollo', to: 'general#apollo'
  get 'apollo/*path', to: 'general#apollo'
  get 'relay*path', to: 'general#relay'
  get 'service-worker-spa*path', to: 'general#service_worker_spa'


  resources :library
  resources :book
  resources :author
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
