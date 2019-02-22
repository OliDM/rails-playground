module Types
  class LibraryType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :address, String, null: false
    field :phone_number, String, null: false
    field :path, String, null: false
    field :active, Boolean, null: false
    field :books_count, Integer, null: true
    field :authors_count, Integer, null: true
    field :books, [Types::BookType], null: true
    field :authors, [Types::AuthorType], null: true

    def books_count
      object.books.count
    end

    def authors_count
      object.authors.distinct.count
    end

    def path
      ::Services::UrlHelpers.library_path(object.id)
    end

  end
end
