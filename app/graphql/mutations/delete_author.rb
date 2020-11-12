module Mutations
  class DeleteAuthor < BaseMutation
    argument :id, ID, required: true

    type Types::AuthorType

    def resolve(id:)
      author = ::Author.find(id)
      author.delete
      author
    end
  end
end
