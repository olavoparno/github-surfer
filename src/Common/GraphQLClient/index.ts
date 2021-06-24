import { GraphQLClient } from "graphql-request";

export function graphqlClient(endpointUrl: string): {
  getClient: () => GraphQLClient;
} {
  let client: GraphQLClient;

  function init() {
    if (!client) {
      client = new GraphQLClient(endpointUrl, {
        headers: {
          Authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY} `,
        },
      });
    }

    return client;
  }

  function getClient() {
    return init();
  }

  return { getClient };
}
