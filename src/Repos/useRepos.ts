import { useQuery, UseQueryResult } from "react-query";
import { GraphQLClient } from "graphql-request";
import { queryRepository } from "./queries";
import { IUseRepos, IUseReposReturn, TUseReposQueryReturn } from "./types";

const endpoint = "https://api.github.com/graphql";

export function useRepos({
  endpointUrl = endpoint,
  topic,
  rowsPerPage,
  after,
  before,
}: IUseRepos = {}): UseQueryResult<TUseReposQueryReturn, unknown> {
  const client = new GraphQLClient(endpointUrl, {
    headers: {
      Authorization: "bearer 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",
    },
  });

  return useQuery(
    ["search", topic, after, before, rowsPerPage],
    async () => {
      const {
        search: { repos, pageInfo, repositoryCount },
      } = await client.request<IUseReposReturn>(queryRepository, {
        query: `sort:stars-desc topic:${topic || "react"}`,
        first: rowsPerPage || 10,
        after,
        before,
      });

      const data = { repos, pageInfo, repositoryCount };

      return data;
    },
    {
      notifyOnChangeProps: ["data", "error"],
      suspense: true,
    }
  );
}
