import { useQuery } from "react-query";
import { request } from "graphql-request";
import { queryRepository } from "./queries";

const endpoint = "https://api.github.com/graphql";

export function useRepos(endpointUrl = endpoint) {
  return useQuery("posts", async () => {
    const {
      posts: { data },
    } = await request(endpoint, queryRepository, {
      query: "istanbul-badges-readme",
      first: 1,
    });
    return data;
  });
}
