class Author < ApplicationRecord
  has_many :books
  has_many :libraries, through: :books
end
