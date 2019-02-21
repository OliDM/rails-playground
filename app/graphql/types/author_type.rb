module Types
  class AuthorType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :last_name, String, null: false
    field :phone_number, String, null: false
    field :email, String, null: false
    field :books, [Types::BookType], null: true
    field :libraries, [Types::LibraryType], null: true
    field :books_count, Integer, null: true
    field :libraries_count, Integer, null: true

    def books_count
      object.books.count
    end

    def libraries_count
      object.libraries.count
    end
  end
end