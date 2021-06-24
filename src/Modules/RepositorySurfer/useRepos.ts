import { useQuery, UseQueryResult } from "react-query";
import { graphqlClient } from "../../Common/GraphQLClient";
import { queryRepository } from "../RepositoryList/queries";
import {
  IUseRepos,
  IUseReposReturn,
  TUseReposQueryReturn,
} from "../RepositoryList/types";

const endpoint = "https://api.github.com/graphql";

export function useRepos({
  endpointUrl = endpoint,
  rowsPerPage,
  topic,
  after,
  before,
}: IUseRepos = {}): UseQueryResult<TUseReposQueryReturn, unknown> {
  const client = graphqlClient(endpointUrl).getClient();

  return useQuery(
    ["search", rowsPerPage, topic, after, before],
    async () => {
      const {
        search: { repos, pageInfo, repositoryCount },
      } = await client.request<IUseReposReturn>(queryRepository, {
        query: `sort:stars-desc topic:${topic || "react"}`,
        first: rowsPerPage || 10,
        after,
        before,
      });

      return { repos, pageInfo, repositoryCount };
    },
    {
      notifyOnChangeProps: ["data", "error"],
      suspense: true,
    }
  );
}
