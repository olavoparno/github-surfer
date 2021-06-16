import { ChangeEvent, MouseEvent, useMemo } from "react";
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
  useTheme,
  IconButton,
  TablePagination,
} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { IPageInfo, TUseReposQueryReturn } from "./types";
import { useStyles } from "./styles";

interface TablePaginationActionsProps {
  page: number;
  onChangePage: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
  pageInfo: IPageInfo;
  setCurrentAfter: () => void;
  setCurrentBefore: () => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const { page, onChangePage, pageInfo, setCurrentAfter, setCurrentBefore } =
    props;

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
    <div className={classes.paginationRoot}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={!hasPreviousPage && page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={!hasNextPage}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
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
}: {
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
}): JSX.Element {
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
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={2}
                count={data?.repositoryCount || 0}
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
