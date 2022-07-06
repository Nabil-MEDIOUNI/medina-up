import { ApolloClient } from 'apollo-client';

import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';

import { InMemoryCache } from 'apollo-cache-inmemory';

import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';

import { API, WS_API } from './config';
import { getTokenWithExpiry } from './helpers/HandleToken';

const wsLink = new WebSocketLink({
  uri: WS_API,
  options: {
    reconnect: true,
  },
});

const httpLink = createUploadLink({ uri: API, credentials: 'include' });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getTokenWithExpiry();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default client;
