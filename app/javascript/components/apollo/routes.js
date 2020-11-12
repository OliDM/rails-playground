import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ApolloLibrariesIndex from "./ApolloLibrariesIndex";
import ApolloLibraryShow from "./ApolloLibraryShow";
import ApolloLibraryNew from "./ApolloLibraryNew";
import ApolloAuthorsView from "./ApolloAuthorsIndex";
import ApolloAuthorShow from "./ApolloAuthorShow";

export default function Routes() {
  const { pathname } = useLocation();
  return (
    <>
      <Route path="/:url*(/+)">
        <Redirect to={pathname.slice(0, -1)} />
      </Route>
      <Route path="/apollo//library/new" component={ApolloLibraryNew} exact={true} />
      <Route path="/apollo/library/:id" component={ApolloLibraryShow} />
      <Route path="/apollo/authors" component={ApolloAuthorsView} exact={true} />
      <Route path="/apollo/authors/:id" component={ApolloAuthorShow} />
      {/* <Route path="/apollo/library/:id/Books" component={ApolloLibraryBooks} /> */}
      <Route path="/apollo" component={ApolloLibrariesIndex} exact={true} />
    </>
  )
}
