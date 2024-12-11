import { GraphQLClient } from 'graphql-request';

export const graphQLClient = new GraphQLClient(
  'https://public-api.nbatopshot.com/graphql/',
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
