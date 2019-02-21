class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :title
      t.string :isbn
      t.string :genre
      t.string :status
      t.string :description

      t.timestamps
    end
  end
end
