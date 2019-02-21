class CreateLibraries < ActiveRecord::Migration[5.2]
  def change
    create_table :libraries do |t|
      t.string :name
      t.string :address
      t.string :phone_number
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
