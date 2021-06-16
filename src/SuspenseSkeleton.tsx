import { Container } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export function RepositoryListSkeleton(): JSX.Element {
  return (
    <Container
      style={{ padding: "16px 8px", height: "calc(50vh - 2rem)" }}
      maxWidth="lg"
    >
      <Skeleton
        style={{ marginBottom: "1rem" }}
        variant="rect"
        width={218}
        height={56}
      />
      <Skeleton variant="rect" width="100%" height={640} />
    </Container>
  );
}
