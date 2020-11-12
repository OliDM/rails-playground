import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams, Link, useHistory } from "react-router-dom";

import { UPDATE_BOOK, DELETE_BOOK, FIND_BOOK, CREATE_BOOK } from "./queries";
import BookDetail from "../books/BookDetail";

const useData = ({ id }) => {
  const history = useHistory();
  const options = { variables: { id: parseInt(id) } };
  const { data, loading } = useQuery(FIND_BOOK, options);
  const [update] = useMutation(UPDATE_BOOK);
  const afterDelete = () => history.push("/apollo/books");
  const afterCreate = (data) => history.push(`/apollo/books/${data.book.id}`);
  const [create] = useMutation(CREATE_BOOK, { onCompleted: afterDelete });
  const [deleteRecord] = useMutation(DELETE_BOOK, { onCompleted: afterCreate });
  const book = data ? data.book : {};

  const onSubmit = (data) => {
    const action = data.id ? update : create;
    action({ variables: { ...data } });
  }

  const onDelete = (id) => {
    deleteRecord({ variables: { id } });
  }

  return {
    book,
    loading,
    onSubmit,
    onDelete,
  }
}

export default function ApolloBookShow() {
  const { id } = useParams();
  const { book, loading, onSubmit, onDelete } = useData({ id });

  if (loading) {
    return <div>Loading Data...</div>;
  }

  return (
    <div>
      <Link to="/apollo/books">
        <button>Back to Books list</button>
      </Link>
      <BookDetail onSubmit={onSubmit} onDelete={onDelete} book={book} />
    </div>
  )
}
