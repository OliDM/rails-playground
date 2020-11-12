import React, { useState, useEffect } from "react";
export default function AuthorDetail({ author, onSubmit, onDelete }) {
  const [state, setState] = useState(author);
  const { id, name, email, lastName, phoneNumber, booksCount } = state;

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
      <FormGroup label="name" id="name" value={name} />
      <FormGroup label="email" id="email" value={email} />
      <FormGroup label="lastName" id="lastName" value={lastName} />
      <FormGroup label="phoneNumber" id="phoneNumber" value={phoneNumber} />
      <FormGroup label="booksCount" id="booksCount" disabled value={booksCount} />
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
