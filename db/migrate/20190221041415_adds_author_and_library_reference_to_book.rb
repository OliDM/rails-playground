class AddsAuthorAndLibraryReferenceToBook < ActiveRecord::Migration[5.2]
  def change
    add_reference :books, :library, index: true
    add_reference :books, :author, index: true

    add_foreign_key :books, :libraries
    add_foreign_key :books, :authors
  end
end
