module Mutations
  class CreateAuthor < BaseMutation
    argument :name, String, required: true
    argument :last_name, String, required: true
    argument :phone_number, String, required: true
    argument :email, String, required: true

    type Types::AuthorType

    def resolve(name:, last_name:, phone_number:, email:)
      ::Author.create({
        name: name,
        last_name: last_name,
        phone_number: phone_number,
        email: email
      })
    end
  end
end
