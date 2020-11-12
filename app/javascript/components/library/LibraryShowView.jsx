import React from "react";
import LibraryDetail from "./LibraryDetail";
import { Link } from "react-router-dom";

export default function LibraryShowView({ loading, ...props }) {
  if (loading) {
    return <span>Loading Data....</span>;
  }

  return (
    <div className="container">
      <Link to="..">Go Back</Link>
      <LibraryDetail {...props} />
    </div>
  );
}

LibraryShowView.defaultProps = {
  library: {
    active: false
  }
}
