import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function LibraryList({ libraries }) {
  const { pathname } = useLocation();
  const libraryElements = libraries.map((library) => {
    return (
      <tr key={library.id}>
        <td>{library.id}</td>
        <td><Link to={pathname + library.path}>{library.name}</Link></td>
        <td>{library.address}</td>
        <td>{library.phoneNumber}</td>
        <td>{library.booksCount}</td>
        <td>{library.authorsCount}</td>
      </tr>
    );
  })

  return (
    <table className="table table-striped table-sm">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>address</th>
          <th>phone_number</th>
          <th>books_count</th>
          <th>authors_count</th>
        </tr>
      </thead>
      <tbody>
        {libraryElements}
      </tbody>
    </table>
  );
}

LibraryList.defaultProps = {
  libraries: []
}
