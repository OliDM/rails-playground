import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ({ items }) {
  const { pathname } = useLocation();
  const authorElements = items.map((author) => {
    return (
      <tr key={author.id}>
        <td>{author.id}</td>
        <td><Link to={pathname + "/" + author.id}>{author.name}</Link></td>
        <td>{author.lastName}</td>
        <td>{author.email}</td>
        <td>{author.phoneNumber}</td>
        <td>{author.booksCount}</td>
      </tr>
    );
  })
  return (
    <div>
      <Link to={`${pathname}/authors/new`}>
        <button> Create a new author</button>
      </Link>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>lastName</th>
            <th>email</th>
            <th>phoneNumber</th>
            <th>Books Count</th>
          </tr>
        </thead>
        <tbody>
          {authorElements}
        </tbody>
      </table>
    </div>
  )
}
