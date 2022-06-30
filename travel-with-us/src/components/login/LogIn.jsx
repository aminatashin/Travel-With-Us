import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Link, useNavigate } from "react-router-dom";

import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";
// ====================================================
const initSign = {
  email: "",
  password: "",
};
// ====================================================
const LogIn = () => {
  const [userData, setUser] = useState(initSign);
  const navigate = useNavigate();
  // ====================================================
  const classes = useStyles();
  // ====================================================
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
    }
  }, []);
  // ====================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPost();
  };
  // ====================================================
  const fetchPost = async () => {
    const res = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("jwtToken", data.token);
      alert("wellCome!");
      navigate("/travel-with-us");
    } else {
      console.log("something went Wrong");
    }
  };
  // ====================================================
  const canSubmit = Boolean(userData.email) && Boolean(userData.password);

  return (
    <Grid item xs={12} sm={4}>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography style={{ color: "green" }} variant="h6">
            Log In
          </Typography>
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
            Log In
          </Button>

          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            <Link to="/signup" style={{ color: "white" }}>
              {" "}
              Do not Have an account? Sign Up
            </Link>
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default LogIn;
