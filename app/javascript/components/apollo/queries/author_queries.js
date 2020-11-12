import { gql } from "@apollo/client"

export const AUTHORS_LIST = gql`
  query AuthorsList {
    authors {
      id
      name
      email
      lastName
      phoneNumber
      booksCount
    }
  }
`

export const FIND_AUTHOR = gql`
  query FindAuthor($id: ID!){
    author(id: $id) {
      id
      name
      email
      lastName
      phoneNumber
      booksCount
      books{
        id
        title
      }
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $name: String!, $lastName: String!, $phoneNumber: String!, $email: String!){
    author: updateAuthor(id: $id, name: $name, lastName: $lastName, phoneNumber: $phoneNumber, email: $email){
      id
      name
      lastName
      phoneNumber
      email
      booksCount
    }
  }
`

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor($name: String!, $lastName: String!, $phoneNumber: String!, $email: String!){
    author: createAuthor(name: $name, lastName: $lastName, phoneNumber: $phoneNumber, email: $email){
      id
      name
      lastName
      phoneNumber
      email
      booksCount
    }
  }
`

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!){
    author: deleteAuthor(id: $id){
      id
    }
  }
`
