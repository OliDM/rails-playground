import { gql } from "@apollo/client"

export const BOOKS_LIST = gql`
  query AuthorsList {
    authors {
      title
      isbn
      genre
      status
      description
      created_at
      updated_at
      library_id
      author_id
    }
  }
`

export const FIND_BOOK = gql`
  query FindBook($id: ID!){
    Book(id: $id) {
      title
      isbn
      genre
      status
      description
      library_id
      author_id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $isbn: String!, $genre: String!, $status: Boolean!, $description: String!, $library_id: Int!, $author_id: Int!){
    book: createBook(title: $title, isbn: $isbn, genre: $genre, status: $status, description: $description, library_id: $library_id, author_id: $author_id){
      title
      isbn
      genre
      status
      description
      library_id
      author_id
    }
  }
`

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $name: String!, $lastName: String!, $phoneNumber: String!, $email: String!){
    book: updateBook(id: $id, title: $title, isbn: $isbn, genre: $genre, status: $status, description: $description, library_id: $library_id, author_id: $author_id){
      id
      name
      lastName
      phoneNumber
      email
      booksCount
    }
  }
`

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!){
    book: deleteBook(id: $id){
      id
    }
  }
`
