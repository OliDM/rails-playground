namespace :spa do
  root to: "library#index"
  resources :library
  resources :book
  resources :author
end