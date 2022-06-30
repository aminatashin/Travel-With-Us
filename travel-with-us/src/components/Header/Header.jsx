import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles.js";
import LogOut from "../LogOut/LogOut";
import { Link } from "react-router-dom";

const Header = ({ setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel With Us
        </Typography>
        <Button style={{ color: "white" }}>
          <Link to="/favourite" style={{ color: "white" }}>
            Favourites
          </Link>
        </Button>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Where You Wanna GO!
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
          <LogOut />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
