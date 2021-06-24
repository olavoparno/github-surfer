import { ChangeEvent, MouseEvent, useCallback, useRef, useState } from "react";
import { Card, TextField } from "@material-ui/core";
import { useStyles } from "./styles";
import { IPageInfo } from "./types";
import { useRepos } from "./useRepos";
import { TUseReposQueryReturn } from "../RepositoryList/types";
import { RepositoryList } from "../RepositoryList";
import { useDebounce } from "../../Common/Hooks/useDebounce";

export function RepositorySurfer(): JSX.Element {
  const styles = useStyles();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentAfter, setCurrentAfter] = useState<string | undefined>();
  const [currentBefore, setCurrentBefore] = useState<string | undefined>();
  const [currentTopic, setCurrentTopic] = useState("");
  const debouncedCurrentTopic = useDebounce(currentTopic, 1000);

  const { status, data } = useRepos({
    rowsPerPage,
    topic: debouncedCurrentTopic,
    after: currentAfter,
    before: currentBefore,
  });

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { value } = e.target;

      setCurrentTopic(value);
    },
    []
  );

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
    setCurrentAfter(undefined);
    setCurrentBefore(undefined);
  };

  const lastCurrentAfterRef = useRef<string | undefined>();

  if (status !== "success") {
    return <div>Status not success</div>;
  }

  const { startCursor, endCursor } = data?.pageInfo as IPageInfo;

  const handleSetCurrentAfter = () => {
    lastCurrentAfterRef.current = startCursor;

    setCurrentAfter(() => endCursor);
    setCurrentBefore(() => undefined);
  };

  const handleSetCurrentBefore = () => {
    setCurrentBefore(() => lastCurrentAfterRef.current);
    setCurrentAfter(() => undefined);
  };

  return (
    <Card className={styles.card}>
      <TextField
        className={styles.textField}
        id="outlined-topic"
        label="Topic"
        placeholder="e.g. React"
        variant="outlined"
        onChange={handleSearch}
      />
      <RepositoryList
        data={data as TUseReposQueryReturn}
        handleSetCurrentAfter={handleSetCurrentAfter}
        handleSetCurrentBefore={handleSetCurrentBefore}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />
    </Card>
  );
}
