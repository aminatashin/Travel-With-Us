import React from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";

const LogOut = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Button onClick={() => handleClick()} style={{ color: "white" }}>
      Log Out
    </Button>
  );
};

export default LogOut;
