import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { AUTHORS_LIST } from "./queries";
import ListView from "../authors/ListView";

export default function ApolloAuthorsIndex() {
  const { loading, data, errors } = useQuery(AUTHORS_LIST);
  const authors = loading ? [] : data.authors;

  const onSubmit = (data)=>{

  }

  return (<ListView onSubmit={onSubmit} items={authors} />)
}
