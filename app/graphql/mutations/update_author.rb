module Mutations
  class UpdateAuthor < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: true
    argument :last_name, String, required: true
    argument :phone_number, String, required: true
    argument :email, String, required: true

    type Types::AuthorType

    def resolve(id:, name:, last_name:, phone_number:, email:)
      author = ::Author.find(id)
      author.name = name
      author.last_name = last_name
      author.phone_number = phone_number
      author.email = email
      author.save!
      author
    end
  end
end
