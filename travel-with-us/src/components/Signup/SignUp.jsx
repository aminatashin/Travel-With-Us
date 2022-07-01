import React, { useState } from "react";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
// ====================================================
const initSign = {
  firstname: "",
  username: "",
  email: "",
  password: "",
};
// ====================================================
const SignUp = () => {
  const [userData, setUser] = useState(initSign);
  const navigate = useNavigate();
  // ====================================================
  const classes = useStyles();
  // ====================================================
  // ====================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPost();
    setUser("");
  };
  // ====================================================
  const fetchPost = async () => {
    const res = await fetch("http://localhost:4000/user/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("successfully signed in!");
      navigate("/");
    }
  };
  // ====================================================
  const canSubmit =
    Boolean(userData.firstname) &&
    Boolean(userData.username) &&
    Boolean(userData.email) &&
    Boolean(userData.password);

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography style={{ color: "green" }} variant="h6">
          Sign Up
        </Typography>
        <TextField
          name="Firstname"
          variant="outlined"
          label="Firstname"
          fullWidth
          value={userData.firstname}
          onChange={(e) => setUser({ ...userData, firstname: e.target.value })}
        />
        <TextField
          name="Username"
          variant="outlined"
          label="Username"
          fullWidth
          value={userData.username}
          onChange={(e) => setUser({ ...userData, username: e.target.value })}
        />
        <TextField
          name="Email"
          variant="outlined"
          label="Email"
          fullWidth
          value={userData.email}
          onChange={(e) => setUser({ ...userData, email: e.target.value })}
        />
        <TextField
          name="Password"
          variant="outlined"
          label="Password"
          fullWidth
          value={userData.password}
          onChange={(e) => setUser({ ...userData, password: e.target.value })}
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={!canSubmit}
        >
          Submit
        </Button>
        {/* <Link to="/" style={{ color: "white" }}>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Have an account? Log In
          </Button>
        </Link> */}
        Do not have an account? Sign Up!
      </form>
    </Paper>
  );
};

export default SignUp;
