import { useCallback, useRef, useState, ChangeEvent, MouseEvent } from "react";
import { Container, TextField } from "@material-ui/core";

import { RepositoryList } from "./Repos/RepositoryList";
import { IPageInfo, TUseReposQueryReturn } from "./Repos/types";
import { useRepos } from "./Repos/useRepos";
import { useStyles } from "./styles";

function App(): JSX.Element {
  const styles = useStyles();
  const timerRef = useRef<NodeJS.Timeout | undefined>();
  const [currentTopic, setCurrentTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentAfter, setCurrentAfter] = useState<string | undefined>();
  const [currentBefore, setCurrentBefore] = useState<string | undefined>();

  const { status, data } = useRepos({
    topic: currentTopic,
    rowsPerPage,
    after: currentAfter,
    before: currentBefore,
  });

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      const { value } = e.target;

      timerRef.current = setTimeout(() => {
        setCurrentTopic(value);
      }, 500);

      return timerRef.current;
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
    <Container className={styles.container} maxWidth="lg">
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
    </Container>
  );
}

export default App;
