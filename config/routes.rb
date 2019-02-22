Rails.application.routes.draw do
  def draw_routes(*file_names)
    file_names.each do |file_name|
      file_path = Rails.root.join("config/routes/#{file_name}.rb")
      file_content = File.read(file_path)
      instance_eval(file_content)
    end
  end

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  root to: "library#index"

  draw_routes("default", "apollo", "relay", "service_workers", "spa")
  post "/graphql", to: "graphql#execute"

  resources :library
  resources :book
  resources :author
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
