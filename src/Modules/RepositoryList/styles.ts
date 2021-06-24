import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  paginationSpacerOverride: {
    display: "none",
  },
  paginationToolbarOverride: {
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxWidth: theme.breakpoints.values.sm / 2,
      flexWrap: "wrap",
    },
  },
  paginationBody: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  table: {
    minWidth: 650,
  },
}));
