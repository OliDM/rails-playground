import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LIBRARIES_LIST } from "./queries";
import LibraryIndexView from "../library/LibraryIndexView";

export default function ApolloLibrariesIndex() {
  const { loading, data, errors } = useQuery(LIBRARIES_LIST);

  const libraries = loading ? [] : data.libraries;

  return <LibraryIndexView loading={loading} errors={errors} libraries={libraries} />
}
