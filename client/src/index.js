import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { split /* HttpLink */ } from '@apollo/client';

import { createUploadLink } from 'apollo-upload-client';

/**
 * Configuration 1
 * if we using only HTTP (query, mutation) or WEBSOCKET (subscription)
 */

// const client = new ApolloClient({
//   uri: 'http://localhost:4000',
//   cache: new InMemoryCache(),
// });

/**
 * End of Configuration 1
 */

// ===========================================================================

/**
 * Configuration 2
 * if we using both of HTTP (query, mutation) and WEBSOCKET (subscription)
 */

// Create connection to apollo server for type query and mutation (HTTP)

// httpLink without upload
// const httpLink = HttpLink({
//   uri: 'http://localhost:4000/graphql',
// });

// httpLink with upload
const httpLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

// Create connection to apollo server for type subscription (WEBSOCKET)
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Create connection to apollo server
const client = new ApolloClient({
  // Use link if we using type query/mutation (with http) and subscription (with ws) and any other link
  // in one project
  // If we have custom link, use from([link1, link2, ...])
  link: splitLink,
  // link: from([httpLink, uploadLink]),
  cache: new InMemoryCache(),
});
/**
 * End of Configuration 2
 */

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
