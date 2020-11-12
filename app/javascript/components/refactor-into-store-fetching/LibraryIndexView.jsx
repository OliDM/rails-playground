import React from "react";
import LibraryFilters from "./LibraryFilters"
import LibraryList from "./LibraryList"
import LibraryStore from "../../stores/LibraryStore";

export default class LibraryIndexView extends React.Component {
  componentDidMount() {
    this.props.store.addChangeListener(() => this.forceUpdate());
    this.props.store.fetch();
  }

  render() {
    let libraries = this.props.store.getRecords();
    return (
      <div>
        <LibraryFilters></LibraryFilters>
        <LibraryList libraries={libraries}></LibraryList>
      </div>
    );
  }
}

LibraryIndexView.defaultProps = {
  store: LibraryStore
}