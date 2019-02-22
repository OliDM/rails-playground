import BaseStore from "./BaseStore";
export class LibraryStore extends BaseStore {
  toggleActive(id, status){
    let params = this.toQuery(this._queries.toggleActive(id, status));
  }
}

const FETCH_QUERY =
  `query{
    libraries{
      id
      name
      phoneNumber
      address
      active
      authorsCount
      booksCount
      path
    }
  }`;

const FIND_QUERY = (id) => {

  return `query{
  library(id: ${id}){
    id
    name
    phoneNumber
    address
    active
    authorsCount
    booksCount
    path
    active
    books{
      url
      path
    }
    authors{
      name
      path
    }
  }
}`
};

let queries = {
  fetch: FETCH_QUERY,
  find: FIND_QUERY
};

let instance = new LibraryStore(queries);
export default instance;
