module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    ##---------------Authors-----------------------

    field :authors, [Types::AuthorType], null: false
    def authors
      Author.all
    end

    field :author, Types::AuthorType, null: false do
      argument :id, ID, required: true
    end

    def author(id:)
      Author.find(id)
    end
    ##---------------Books-----------------------
    field :books, [Types::BookType], null: false

    def books
      Book.all
    end

    field :book, Types::BookType, null: false do
      argument :id, ID, required: true
    end

    def book(id:)
      Book.find(id)
    end

    ##---------------Libraries-----------------------
    field :libraries, [Types::LibraryType], null: false

    def libraries
      Library.all
    end

    field :library, Types::LibraryType, null: false do
      argument :id, ID, required: true
    end

    def library(id:)
      Library.find(id)
    end

    # TODO: remove me
    field :test_field, String, null: false, description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end
  end
end
