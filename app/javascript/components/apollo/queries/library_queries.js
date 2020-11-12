import { gql } from "@apollo/client"

export const LIBRARIES_LIST = gql`
  query {
    libraries {
      id
      name
      address
      phoneNumber
      path
      active
      booksCount
      authorsCount
      path
    }
  }
`

export const FIND_LIBRARY = gql`
  query FindLibrary($id: ID!){
    library(id: $id) {
      id
      name
      address
      phoneNumber
      path
      active
      booksCount
      authorsCount
      path
    }
  }
`

export const UPDATE_LIBRARY = gql`
  mutation UpdateLibrary($id: ID!, $active: Boolean!, $name: String!, $address: String!, $phoneNumber: String! ){
    library: updateLibrary(id: $id, active: $active, name: $name, address: $address, phoneNumber: $phoneNumber){
      id
      name
      address
      phoneNumber
      path
      active
      booksCount
      authorsCount
      path
    }
  }
`

export const CREATE_LIBRARY = gql`
  mutation CreateLibrary($active: Boolean!, $name: String!, $address: String!, $phoneNumber: String! ){
    library: createLibrary(active: $active, name: $name, address: $address, phoneNumber: $phoneNumber){
      id
      name
      address
      phoneNumber
      path
      active
      booksCount
      authorsCount
      path
    }
  }
`

export const DELETE_LIBRARY = gql`
  mutation DeleteLibrary($id: ID!){
    library: deleteLibrary(id: $id){
      id
    }
  }
`
