import { MouseEvent, useMemo } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Link,
  TableFooter,
  IconButton,
  TablePagination,
} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { IRepositoryListProps, ITablePaginationActionsProps } from "./types";
import { useStyles } from "./styles";
import { IPageInfo } from "../RepositorySurfer/types";

function TablePaginationActions({
  page,
  onChangePage,
  pageInfo,
  setCurrentAfter,
  setCurrentBefore,
}: ITablePaginationActionsProps): JSX.Element {
  const classes = useStyles();

  const { hasNextPage, hasPreviousPage } = pageInfo;

  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
    setCurrentBefore();
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
    setCurrentAfter();
  };

  return (
    <div className={classes.paginationBody}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={!hasPreviousPage && page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={!hasNextPage}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
}

export function RepositoryList({
  data,
  handleSetCurrentAfter,
  handleSetCurrentBefore,
  handleChangeRowsPerPage,
  handleChangePage,
  currentPage,
  rowsPerPage,
}: IRepositoryListProps): JSX.Element {
  const classes = useStyles();

  return useMemo(
    () => (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Stars</TableCell>
              <TableCell align="left">Forks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.repos.map(({ repo: currentRepo }) => (
              <TableRow key={currentRepo.name}>
                <TableCell component="th" scope="row">
                  <Link target="_blank" rel="noreferrer" href={currentRepo.url}>
                    {currentRepo.name}
                  </Link>
                </TableCell>
                <TableCell align="left">{currentRepo.stargazerCount}</TableCell>
                <TableCell align="left">{currentRepo.forkCount}</TableCell>
              </TableRow>
            ))}
            {data.repos.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {data.repos.length > 0 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  classes={{
                    spacer: classes.paginationSpacerOverride,
                  }}
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={2}
                  count={data.repositoryCount}
                  rowsPerPage={rowsPerPage}
                  page={currentPage}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={(props) => (
                    <TablePaginationActions
                      pageInfo={data?.pageInfo as IPageInfo}
                      setCurrentAfter={handleSetCurrentAfter}
                      setCurrentBefore={handleSetCurrentBefore}
                      {...props}
                    />
                  )}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    ),
    [
      classes,
      currentPage,
      data,
      handleChangePage,
      handleChangeRowsPerPage,
      handleSetCurrentAfter,
      handleSetCurrentBefore,
      rowsPerPage,
    ]
  );
}
