module Types
  class BookType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :isbn, String, null: false
    field :genre, String, null: false
    field :status, String, null: false
    field :description, String, null: false
    field :author, AuthorType, null: false
    field :library, LibraryType, null: false

  end
end
