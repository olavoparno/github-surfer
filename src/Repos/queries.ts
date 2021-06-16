import { gql } from "graphql-request";

export const queryRepository = gql`
  query ($query: String!, $first: Int!, $after: String, $before: String) {
    search(
      query: $query
      first: $first
      after: $after
      before: $before
      type: REPOSITORY
    ) {
      repos: edges {
        repo: node {
          ... on Repository {
            name
            url
            stargazerCount
            forkCount
          }
        }
      }
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
  }
`;
