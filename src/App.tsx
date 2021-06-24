import { Suspense } from "react";
import { Container } from "@material-ui/core";
import { RepositorySurfer } from "./Modules/RepositorySurfer";
import { RepositoryListSkeleton } from "./Modules/RepositoryList/skeleton";

function App(): JSX.Element {
  return (
    <Container maxWidth="lg">
      <Suspense fallback={<RepositoryListSkeleton />}>
        <RepositorySurfer />
      </Suspense>
    </Container>
  );
}

export default App;
