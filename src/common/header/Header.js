import React, { Fragment, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [IsLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("access-token") == null ? false : true
  );
  const [OpenLoginRegisterModal, setOpenLoginRegisterModal] = useState(false);
  const [ModalTabValue, setModalTabValue] = useState(0);
  const handleCloseLoginRegisterModal = () => setOpenLoginRegisterModal(false);
  const [LoginFormValues, setLoginFormValues] = useState({
    username: "",
    password: "",
  });
  const [UsernameRequired, setUsernameRequired] = useState(false);
  const [LoginPasswordRequired, setLoginPasswordRequired] = useState(false);

  const [RegisterFormValues, setRegisterFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    registerPassword: "",
    contact: "",
  });

  const [FirstNameRequired, setFirstNameRequired] = useState(false);
  const [LastNameRequired, setLastNameRequired] = useState(false);
  const [EmailRequired, setEmailRequired] = useState(false);
  const [ContactRequired, setContactRequired] = useState(false);
  const [RegisterPasswordRequired, setRegisterPasswordRequired] =
    useState(false);
  const [IsRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleModalTabChange = (event, newValue) => {
    setModalTabValue(newValue);
  };

  const onLoginFormSubmit = (e) => {
    e.preventDefault();
    setUsernameRequired(LoginFormValues.username === "" ? true : false);
    setLoginPasswordRequired(LoginFormValues.password === "" ? true : false);

    fetch(props.baseUrl + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Authorization:
          "Basic " +
          window.btoa(
            LoginFormValues.username + ":" + LoginFormValues.password
          ),
      },
    })
      .then((response) => {
        sessionStorage.setItem(
          "access-token",
          response.headers.get("access-token")
        );
        return response.json();
      })
      .then((response) => {
        if (response.status === "ACTIVE") {
          setIsLoggedIn(true);
          handleCloseLoginRegisterModal();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("access-token");
    setIsLoggedIn(false);
  };

  const onRegisterFormSubmit = (e) => {
    e.preventDefault();

    setFirstNameRequired(RegisterFormValues.firstname === "" ? true : false);
    setLastNameRequired(RegisterFormValues.lastname === "" ? true : false);
    setEmailRequired(RegisterFormValues.email === "" ? true : false);
    setRegisterPasswordRequired(
      RegisterFormValues.registerPassword === "" ? true : false
    );
    setContactRequired(RegisterFormValues.contact === "" ? true : false);

    let signupData = JSON.stringify({
      first_name: RegisterFormValues.firstname,
      last_name: RegisterFormValues.lastname,
      email_address: RegisterFormValues.email,
      mobile_number: RegisterFormValues.contact,
      password: RegisterFormValues.registerPassword,
    });

    fetch(props.baseUrl + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: signupData,
    })
      .then((response) => response.json())
      .then((response) => {
        setIsRegistrationSuccess(response.status === "ACTIVE" ? true : false);
      });
  };

  return (
    <Fragment>
      <header className="topnav">
        <img
          src={logo}
          className="header-logo header-logo-animation"
          alt="header-logo"
        />
        {IsLoggedIn ? (
          <Button
            onClick={(e) => logoutHandler(e)}
            className="header-button"
            color="default"
            variant="contained"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={(e) => setOpenLoginRegisterModal(true)}
            className="header-button"
            color="default"
            variant="contained"
          >
            Login
          </Button>
        )}

        {props.showBookShowButton === true && !IsLoggedIn ? (
          <div className="bookshow-button">
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setOpenLoginRegisterModal(true)}
            >
              Book Show
            </Button>
          </div>
        ) : (
          ""
        )}

        {props.showBookShowButton === true && IsLoggedIn ? (
          <div className="bookshow-button">
            <Link to={"/bookshow/" + props.id}>
              <Button variant="contained" color="primary">
                Book Show
              </Button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </header>
      <Modal
        ariaHideApp={false}
        isOpen={OpenLoginRegisterModal}
        contentLabel="Login"
        onRequestClose={handleCloseLoginRegisterModal}
        style={customModalStyles}
      >
        <Tabs
          className="tabs"
          value={ModalTabValue}
          onChange={handleModalTabChange}
          variant="fullWidth"
        >
          <Tab disableFocusRipple label="LOGIN" />
          <Tab disableFocusRipple label="REGISTER" />
        </Tabs>
        {ModalTabValue === 0 && (
          <div style={{ padding: 0, textAlign: "center" }}>
            <FormControl required>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                type="text"
                value={LoginFormValues.username}
                onChange={(e) => {
                  setLoginFormValues({
                    ...LoginFormValues,
                    username: e.target.value,
                  });
                }}
              />
              {UsernameRequired && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="loginPassword">Password</InputLabel>
              <Input
                id="loginPassword"
                type="password"
                value={LoginFormValues.password}
                onChange={(e) => {
                  setLoginFormValues({
                    ...LoginFormValues,
                    password: e.target.value,
                  });
                }}
              />
              {LoginPasswordRequired && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            {IsLoggedIn === true && (
              <FormControl>
                <span className="successText">Login Successful!</span>
              </FormControl>
            )}
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={onLoginFormSubmit}
            >
              LOGIN
            </Button>
          </div>
        )}

        {ModalTabValue === 1 && (
          <div style={{ padding: 0, textAlign: "center" }}>
            <FormControl required>
              <InputLabel htmlFor="firstname">First Name</InputLabel>
              <Input
                id="firstname"
                type="text"
                value={RegisterFormValues.firstname}
                onChange={(e) => {
                  setRegisterFormValues({
                    ...RegisterFormValues,
                    firstname: e.target.value,
                  });
                }}
              />
              {FirstNameRequired && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="lastname">Last Name</InputLabel>
              <Input
                id="lastname"
                type="text"
                value={RegisterFormValues.lastname}
                onChange={(e) => {
                  setRegisterFormValues({
                    ...RegisterFormValues,
                    lastname: e.target.value,
                  });
                }}
              />
              {LastNameRequired && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                type="text"
                value={RegisterFormValues.email}
                onChange={(e) => {
                  setRegisterFormValues({
                    ...RegisterFormValues,
                    email: e.target.value,
                  });
                }}
              />
              {EmailRequired && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="registerPassword">Password</InputLabel>
              <Input
                id="registerPassword"
                type="password"
                value={RegisterFormValues.registerPassword}
                onChange={(e) => {
                  setRegisterFormValues({
                    ...RegisterFormValues,
                    registerPassword: e.target.value,
                  });
                }}
              />
              {RegisterPasswordRequired && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="contact">Contact No.</InputLabel>
              <Input
                id="contact"
                type="text"
                value={RegisterFormValues.contact}
                onChange={(e) => {
                  setRegisterFormValues({
                    ...RegisterFormValues,
                    contact: e.target.value,
                  });
                }}
              />
              {ContactRequired && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            {IsRegistrationSuccess === true && (
              <FormControl>
                <span>Registration Successful. Please Login!</span>
              </FormControl>
            )}
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={onRegisterFormSubmit}
            >
              REGISTER
            </Button>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default Header;
