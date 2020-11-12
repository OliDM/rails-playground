import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ({ items }) {
  const { pathname } = useLocation();
  const authorElements = items.map((book) => {
    return (
      <tr key={book.id}>
        <td>{book.title}</td>
        <td>{book.isbn}</td>
        <td>{book.genre}</td>
        <td>{book.status}</td>
        <td><Link to={`${pathname}/library/${book.library.id}`}> {book.library.name}</Link></td>
        <td><Link to={`${pathname}/author/${book.author.id}`}> {book.author.name}</Link></td>
        <td>{book.description}</td>
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
            <th>Title</th>
            <th>Isbn</th>
            <th>Genre</th>
            <th>Status</th>
            <th>Author</th>
            <th>Library</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {authorElements}
        </tbody>
      </table>
    </div>
  )
}
