module Mutations
  class DeleteLibrary < BaseMutation
    argument :id, ID, required: true

    type Types::LibraryType

    def resolve(id:)
      library = Library.find(id)
      library.delete
      library
    end
  end
end
