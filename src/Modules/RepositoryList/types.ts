import { ChangeEvent, MouseEvent } from "react";
import { IPageInfo } from "../RepositorySurfer/types";

export interface IRepo {
  repo: {
    name: string;
    url: string;
    stargazerCount: number;
    forkCount: number;
  };
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

export interface ITablePaginationActionsProps {
  page: number;
  onChangePage: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
  pageInfo: IPageInfo;
  setCurrentAfter: () => void;
  setCurrentBefore: () => void;
}

export interface IRepositoryListProps {
  data: TUseReposQueryReturn;
  handleSetCurrentAfter: () => void;
  handleSetCurrentBefore: () => void;
  handleChangeRowsPerPage: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleChangePage: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  currentPage: number;
  rowsPerPage: number;
}
