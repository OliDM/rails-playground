module Mutations
  class ToggleLibraryStatus < BaseMutation
    argument :id, Integer, required: true
    argument :status, Boolean, required: true

    type Types::LibraryType

    def resolve(id:, status:)
      library = Library.find(id)
      library.active = status
      library.save!
    end
  end
end
