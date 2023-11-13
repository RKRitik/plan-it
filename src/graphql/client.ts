import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPH_QL_SERVER } from '@env';

export const client = new ApolloClient({
  uri: GRAPH_QL_SERVER,
  cache: new InMemoryCache(),
});
