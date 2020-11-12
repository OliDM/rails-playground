import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams, useHistory, Link } from "react-router-dom";

import { UPDATE_AUTHOR, DELETE_AUTHOR, FIND_AUTHOR, CREATE_AUTHOR } from "./queries";
import AuthorDetail from "../authors/AuthorDetail";

const removeFromCache = (id) => (cache) => {
  cache.modify({
    fields: {
      authors(currentAuthors = [], { readField }) {
        return currentAuthors.filter(ref => id !== readField('id', ref))
      }
    }
  })
}

const addToCache = (fieldsKey, itemKey) => (cache, data) => {
  const newItem = itemKey ? data[data] : data;
  cache.modify({
    fields: {
      [fieldsKey](items = [], { readField }) {
        const alreadyExists = items.some(ref => readField('id', ref) === newItem.id);

        return alreadyExists ? items : [...items, newItemRef];
      }
    }
  });
}

const useData = ({ id }) => {
  const history = useHistory();
  const options = { variables: { id: parseInt(id) } };
  const { data, loading } = useQuery(FIND_AUTHOR, options);
  const [update] = useMutation(UPDATE_AUTHOR);
  const afterDelete = () => history.push("/apollo/authors");
  const afterCreate = (data) => history.push(`/apollo/authors/${data.author.id}`);
  const [deleteRecord] = useMutation(DELETE_AUTHOR, { onCompleted: afterDelete, update: removeFromCache(id) })
  const [create] = useMutation(CREATE_AUTHOR, { onCompleted: afterCreate, update: addToCache('authors', 'author') });
  const author = data ? data.author : {};

  const onSubmit = (data) => {
    const action = data.id ? update : create;
    action({ variables: { ...data } });
  }

  const onDelete = (id) => {
    deleteRecord({ variables: { id } });
  }

  return {
    author,
    loading,
    onSubmit,
    onDelete,
  }
}

export default function ApolloAuthorShow() {
  const { id } = useParams();
  const { author, loading, onSubmit, onDelete } = useData({ id });

  if (loading) {
    return <div>Loading Data...</div>;
  }

  return (
    <div>
      <Link to="/apollo/authors">
        <button>Back to Authors list</button>
      </Link>
      <AuthorDetail onSubmit={onSubmit} onDelete={onDelete} author={author} />
    </div>
  )
}
