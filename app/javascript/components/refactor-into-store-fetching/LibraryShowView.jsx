import React from "react";
import store from "../../stores/LibraryStore";
import LibraryDetail from "./LibraryDetail"

export default class LibraryShowView extends React.Component {
  constructor(props, context){
    super(props, context);

    this.toggleActive = this.toggleActive.bind(this);
  }

  componentDidMount() {
    let { store, id } = this.props;
    store.addChangeListener(() => this.forceUpdate());
    store.find(id);
    window.store = store;
  }

  toggleActive(id, newStatus){
    this.props.store.toggleActive(id, newStatus);
  }

  render() {
    let library = this.props.store.getRecord();
    return (
      <div className="container">
        {library.id && <LibraryDetail {...library} toggleActive={this.toggleActive}/>}
      </div>
    );
  }
}

LibraryShowView.defaultProps = {
  store: store,
  id: undefined
}