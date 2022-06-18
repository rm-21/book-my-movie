import React, { useState } from "react";
import LoginModal from "./Modal";

import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Tab,
  Tabs,
  TextField,
  Typography,
  createTheme,
} from "@material-ui/core";

import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./Header.css";
import { makeStyles } from "@material-ui/core/styles";
import { flexbox } from "@mui/system";

export default function Header({ bookShow }) {
  // states
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  // makeStyles gets accesses to the global themes
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignContent: "nowrap",
      justifyContent: "center",
    },

    button: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(8),
      marginLeft: theme.spacing(8),
    },
  }));

  const classes = useStyles();

  const handleLoginClick = () => {
    setLoggedIn(true);
    setLoginModal(true);
  };

  const handleLogoutClick = () => {
    setLoggedIn(false);
  };

  const handleModalSubmit = () => {
    setLoginModal(false);
  };

  return (
    <div className="header">
      <div className="rotating-logo">
        <Link to="/">
          <img src={Logo} alt="logo" className="header-logo" />
        </Link>
      </div>

      <div className="btn-all loginOut">
        {loggedIn ? (
          <Button variant="contained" name="Logout" onClick={handleLogoutClick}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" name="Login" onClick={handleLoginClick}>
            Login
          </Button>
        )}
      </div>

      {loginModal && <LoginModal handleModalSubmit={handleModalSubmit} />}
    </div>
  );
}
