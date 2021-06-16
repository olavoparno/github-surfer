import { gql } from "graphql-request";

export const queryRepository = gql`
  query ($query: String!, $first: Int!) {
    search(query: $query, first: $first, type: REPOSITORY) {
      repos: edges {
        repo: node {
          ... on Repository {
            url
            stargazerCount
            forkCount
          }
        }
      }
    }
  }
`;
