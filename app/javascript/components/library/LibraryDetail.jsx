import React from "react";
export default class LibraryDetail extends React.Component {
  deactivate(event){
    event.preventDefault();
    this.props.toggleActive(this.props.id, false);
  }

  activate(event){
    event.preventDefault();
    this.props.toggleActive(this.props.id, true);
  }

  render() {
    let { name, phoneNumber, address, active, authorsCount, booksCount } = this.props;
    return (
      <div>
        <div>
          <label>name</label>
          <p>{name}</p>
        </div>
        <div>
          <label>phoneNumber</label>
          <p>{phoneNumber}</p>
        </div>
        <div>
          <label>address</label>
          <p>{address}</p>
        </div>
        <div>
          <label>active</label>
          <p>{active}</p>
        </div>
        <div>
          <label>authorsCount</label>
          <p>{authorsCount}</p>
        </div>
        <div>
          <label>booksCount</label>
          <p>{booksCount}</p>
        </div>

        {active && <div>
          <button onClick={this.deactivate}>Deactivate</button>
        </div>
        }

        {!active && <div>
          <button onClick={this.activate}>Activate</button>
        </div>
        }
      </div>
    );
  }
}

LibraryDetail.defaultProps = {
  name: "",
  phoneNumber: "",
  address: "",
  active: false,
  authorsCount: 0,
  booksCount: 0,
  toggleActive: (id, status)=>{},
}