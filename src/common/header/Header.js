import React, { useState } from "react";
import LoginModal from "./Modal";

import { Button } from "@material-ui/core";

import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ bookShow, bookShowId }) {
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

      {/* If on released movie page, bookShow=true */}
      {bookShow ? (
        <Link
          to={"/book-show/" + bookShowId}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" name="Book Show" color="primary">
            Book Show
          </Button>
        </Link>
      ) : null}

      {/* Showing login modal */}
      {loginModal && (
        <LoginModal
          handleModalSubmit={handleModalSubmit}
          loginModal={loginModal}
        ></LoginModal>
      )}
    </div>
  );
}
