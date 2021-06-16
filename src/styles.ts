import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2, 1),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));
