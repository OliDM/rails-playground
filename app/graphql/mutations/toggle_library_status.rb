class Mutations::ToggleLibraryStatus < Mutations::BaseMutation
  argument :id, Integer, required: true
  argument :status, Boolean, required: true

  field :library, Types::LibraryType, null: false
  field :errors, [String], null: false

  def resolve(id:, status:)
    library = Library.find(id)
    library.active = status
    if library.save
      # Successful creation, return the created object with no errors
      {
        library: library,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        library: nil,
        errors: library.errors.full_messages
      }
    end
  end
end