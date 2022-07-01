import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  Typography: {
    fontSize: 50,
    fontWeight: 700,
    marginTop: 30,
    color: "green",
    marginLeft: 50,
  },
  body: {
    background: "red",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: 60,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
