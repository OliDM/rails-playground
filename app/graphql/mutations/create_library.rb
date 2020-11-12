module Mutations
  class CreateLibrary < BaseMutation
    argument :active, Boolean, required: true
    argument :name, String, required: true
    argument :address, String, required: true
    argument :phone_number, String, required: true

    type Types::LibraryType

    def resolve(active:, name:, address:, phone_number:)
      Library.create({
        active: active,
        name: name,
        address: address,
        phone_number: phone_number
      })
    end
  end
end
