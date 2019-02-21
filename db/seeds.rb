ActiveRecord::Base.transaction do
  klasses = [Book, Author, Library]

  klasses.map(&:table_name).each do |table_name|
    ActiveRecord::Base.connection.execute("TRUNCATE #{table_name} RESTART IDENTITY CASCADE")
  end

  libraries = []
  book_status = ["available", "lended", "damaged", "lended-late"]

  5.times do |i|
    library = Library.create!(
      name: "#{FFaker::AddressUS.state}, #{FFaker::Education.school_name}",
      address: FFaker::AddressUS.street_address,
      phone_number: FFaker::PhoneNumber.short_phone_number,
      active: [true, false].sample,
    )
    libraries.push(library)
  end

  10.times do |i|
    author = Author.create!(
      name: FFaker::Name.name,
      last_name: FFaker::Name.last_name,
      phone_number: FFaker::PhoneNumber.short_phone_number,
      email: FFaker::Internet.email
    )

    20.times do |index|
      book = Book.create!(
        library: libraries.sample,
        author: author,
        title: FFaker::Book.title,
        isbn: FFaker::Book.isbn,
        genre: FFaker::Book.genre,
        description: FFaker::Book.description,
        status: book_status.sample,
      )
    end
  end
end