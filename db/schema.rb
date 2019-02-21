# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_21_041415) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authors", force: :cascade do |t|
    t.string "name"
    t.string "last_name"
    t.string "phone_number"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "books", force: :cascade do |t|
    t.string "title"
    t.string "isbn"
    t.string "genre"
    t.string "status"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "library_id"
    t.bigint "author_id"
    t.index ["author_id"], name: "index_books_on_author_id"
    t.index ["library_id"], name: "index_books_on_library_id"
  end

  create_table "libraries", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "phone_number"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "books", "authors"
  add_foreign_key "books", "libraries"
end
