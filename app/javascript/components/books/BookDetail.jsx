import React, { useState, useEffect } from "react";
export default function BookDetail({ book, onSubmit, onDelete }) {
  const [state, setState] = useState(book);
  const {
    id,
    title,
    isbn,
    genre,
    status,
    description,
    created_at,
    updated_at,
    library_id,
    author_id
  } = state;

  const save = (event) => {
    event.preventDefault();
    onSubmit(state);
  }

  const onChange = (event) => {
    const { id, value } = event.target;
    setState({ ...state, [id]: value });
  }

  const doDelete = () => onDelete(id);

  return (
    <form onSubmit={save} onChange={onChange}>
      <FormGroup label="title" id="title" value={title} />
      <FormGroup label="isbn" id="isbn" value={isbn} />
      <FormGroup label="genre" id="genre" value={genre} />
      <FormGroup label="status" id="status" value={status} />
      <FormGroup label="description" id="description" value={description} />
      <FormGroup label="created_at" id="created_at" value={created_at} />
      <FormGroup label="updated_at" id="updated_at" value={updated_at} />
      <FormGroup label="library_id" id="library_id" value={library_id} />
      <FormGroup label="author_id" id="author_id" value={author_id} />
      <button type="submit">Save Changes</button>
      {id && <button onClick={doDelete}>Delete Record</button>}
    </form>
  );
}

function FormGroup({ id, label, value, type, disabled }) {
  return (
    <div className="form-group">
      <label>{label || id}</label>
      <input type={type} className="form-control" id={id} value={value} disabled={disabled} />
    </div>
  );
}
