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

export default function Header({ bookShow }) {
  // states
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

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

      {loginModal && (
        <LoginModal
          handleModalSubmit={handleModalSubmit}
          loginModal={loginModal}
        ></LoginModal>
      )}
    </div>
  );
}
