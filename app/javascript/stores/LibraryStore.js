import BaseStore, { REQUEST_TYPES } from "./BaseStore";
export class LibraryStore extends BaseStore {
  toggleActive(id, status){
    this._requestType = REQUEST_TYPES.mutation;
    let params = this.toQuery(this._queries.toggleActive(id, status));
    this._requesterClass.post(this._ENDPOINT_URL, params, this._requestSuccess, this._requestFailure);
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
    books {
      title
      path
    }
    authors{
      name
      path
    }
  }
}`
};

const TOGGLE_ACTIVE = (id, status) =>{
  return `
  mutation{
  toggleLibraryStatus(input:{
    id: ${id},
    status: ${status}
  }) {
    library{
      id
      name
      phoneNumber
      address
      active
      authorsCount
      booksCount
      path
      active
      books {
        title
        path
      }
      authors{
        name
        path
      }
    }
  }
}
  `
};

let queries = {
  fetch: FETCH_QUERY,
  find: FIND_QUERY,
  toggleActive: TOGGLE_ACTIVE
};

let instance = new LibraryStore(queries);
export default instance;
