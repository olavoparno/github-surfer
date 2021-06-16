export interface IRepo {
  repo: {
    name: string;
    url: string;
    stargazerCount: number;
    forkCount: number;
  };
}

export interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IUseReposReturn {
  search: {
    repos: IRepo[];
    repositoryCount: number;
    pageInfo: IPageInfo;
  };
}

export type TUseReposQueryReturn = { repos: IRepo[] } & {
  repositoryCount: number;
  pageInfo: IPageInfo;
};

export interface IUseRepos {
  endpointUrl?: string;
  topic?: string;
  rowsPerPage?: number;
  after?: string;
  before?: string;
}
