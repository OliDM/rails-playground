module Mutations
  class UpdateLibrary < BaseMutation
    argument :id, ID, required: true
    argument :active, Boolean, required: true
    argument :name, String, required: true
    argument :address, String, required: true
    argument :phone_number, String, required: true

    type Types::LibraryType

    def resolve(id:, active:, name:, address:, phone_number:)
      library = Library.find(id)
      library.name = name
      library.address = address
      library.phone_number = phone_number
      library.active = active
      library.save!
      library
    end
  end
end
