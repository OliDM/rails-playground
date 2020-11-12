import React from "react";
import { Link, useLocation } from "react-router-dom";
import LibraryFilters from "./LibraryFilters"
import LibraryList from "./LibraryList"

export default function LibraryIndexView({ libraries, loading }) {
  if (loading) {
    return <span>Loading Data</span>;
  }
  const { pathname } = useLocation();

  return (
    <div>
      <LibraryFilters></LibraryFilters>
      <Link to={`${pathname}/library/new`}>
        <button> Create a new Library</button>
      </Link>
      <LibraryList libraries={libraries}></LibraryList>
    </div>
  );
}

LibraryIndexView.defaultProps = {
  libraries: [],
  loading: false
}
