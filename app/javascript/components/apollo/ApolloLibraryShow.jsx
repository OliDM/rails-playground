import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Redirect, useParams } from "react-router-dom";

import { DELETE_LIBRARY, FIND_LIBRARY, UPDATE_LIBRARY } from "./queries";
import LibraryShowView from "../library/LibraryShowView";

export default function ApolloLibraryShowView() {
  const { id } = useParams();
  const options = { variables: { id: parseInt(id) } };
  const { data, ...response } = useQuery(FIND_LIBRARY, options);
  const [updateLibrary, { data: updatedData }] = useMutation(UPDATE_LIBRARY);
  const [deleteLibrary, { data: wasDeleted }] = useMutation(DELETE_LIBRARY)
  const library = data ? data.library : {};
  const toggleActive = (id, newStatus) => {
    this.props.store.toggleActive(id, newStatus);
  }

  const onSubmit = (data) => {
    updateLibrary({ variables: { ...data } });
  }

  const onDelete = (id) => {
    deleteLibrary({ variables: { id } });
  }

  if (wasDeleted && wasDeleted.library) {
    return (<Redirect to="/apollo" />);
  }

  return (<LibraryShowView {...response} onSubmit={onSubmit} onDelete={onDelete} library={library} toggleActive={toggleActive} />)
}
