module Types
  class LibraryType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :address, String, null: false
    field :phone_number, String, null: false
    field :active, Boolean, null: false
  end
end
