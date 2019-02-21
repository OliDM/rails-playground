class Book < ApplicationRecord
  belongs_to :library
  belongs_to :author
end
