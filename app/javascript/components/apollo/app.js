import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
import ApolloRoutes from './routes';

const connectToDevTools = true;
const history = createBrowserHistory();
const cache = new InMemoryCache({});
const client = new ApolloClient({
  cache,
  uri: '/graphql',
  connectToDevTools
});

export default function ApolloApp(props) {
  return (
    <div>
      <ApolloProvider client={client}>
        <BrowserRouter history={history}>
          <Switch>
            <ApolloRoutes />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  )
}
