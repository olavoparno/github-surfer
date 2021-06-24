import Skeleton from "@material-ui/lab/Skeleton";

export function RepositoryListSkeleton(): JSX.Element {
  return (
    <>
      <Skeleton
        style={{ margin: "2rem 1rem" }}
        variant="rect"
        width={218}
        height={56}
      />
      <Skeleton
        style={{ margin: "2rem 1rem" }}
        variant="rect"
        width="100%"
        height={640}
      />
    </>
  );
}
