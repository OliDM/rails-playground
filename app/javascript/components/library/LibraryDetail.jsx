import React, { useState } from "react";
export default function LibraryDetail({ library, onSubmit, onDelete }) {
  const [state, setState] = useState(library);
  const { id, name, phoneNumber, address, active, authorsCount, booksCount } = state;

  const save = (event) => {
    event.preventDefault();
    onSubmit(state);
  }

  const onChange = (event) => {
    let { id, value, checked } = event.target;
    value = event.target.type == 'checkbox' ? checked : value;
    setState({ ...state, [id]: value });
  }
  const doDelete = () => onDelete(id);

  return (
    <form onSubmit={save} onChange={onChange}>
      <FormGroup label="name" id="name" value={name} />
      <FormGroup label="phoneNumber" id="phoneNumber" value={phoneNumber} />
      <FormGroup label="address" id="address" value={address} />
      <FormGroup label="authorsCount" id="authorsCount" disabled value={authorsCount} />
      <FormGroup label="booksCount" id="booksCount" disabled value={booksCount} />
      <FormGroup label="active" id="active" value={active} type="checkbox" />
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
