import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { CREATE_LIBRARY } from "./queries";
import LibraryShowView from "../library/LibraryShowView";

export default function ApolloLibraryNew() {
  const [createLibrary, { data }] = useMutation(CREATE_LIBRARY);
  const onSubmit = (libraryData) => {
    createLibrary({ variables: { ...libraryData } });
  }

  if (data) {
    return <Redirect to={'..'+ data.library.path } />
  }

  return (<LibraryShowView onSubmit={onSubmit} />)
}
