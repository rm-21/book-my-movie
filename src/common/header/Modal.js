import Modal from "react-modal";
import React, { Fragment } from "react";
import TabPanel from "./TabPanel";
import { useState } from "react";
import { Button, Tab, Tabs, TextField, Typography } from "@material-ui/core";

export default function LoginModal(props) {
  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.75)",
    },
    content: {
      position: "absolute",
      top: "20%",
      left: "30%",
      right: "30%",
      width: "30%",
      height: "fit-content",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };

  const [tabVal, setTabVal] = useState(0);
  const onTabChange = (event, newTabVal) => {
    setTabVal(newTabVal);
  };

  const [success, setSuccess] = useState(false);

  const registerForm = () => {
    setSuccess(true);
    setInterval(props.handleModalSubmit, 1000);
  };

  return (
    <Modal
      isOpen={props.loginModal}
      onRequestClose={props.handleModalSubmit}
      ariaHideApp={false}
      style={customStyles}
    >
      {/* Tabs - Login & Register */}
      <Tabs value={tabVal} onChange={onTabChange}>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      {/* Tab Panel - LOGIN */}
      <TabPanel value={tabVal} index={0}>
        <TextField label="Username" required />
        <br />
        <br />
        <TextField label="Password" required type="password" />
        <br />
        <br />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={props.handleModalSubmit}
        >
          Login
        </Button>
      </TabPanel>

      {/* Tab Panel - REGISTER */}
      <TabPanel value={tabVal} index={1}>
        <TextField label="First Name" required />
        <br />
        <br />
        <TextField label="Last Name" required />
        <br />
        <br />
        <TextField label="Email" required />
        <br />
        <br />
        <TextField required label="Password" type="password" />
        <br />
        <br />
        <TextField required label="Contact No." />
        <br />
        <br />

        {success ? (
          <Fragment>
            <Typography variant="subtitle1" gutterBottom>
              Registration Successful. Please login!
            </Typography>
            <br />
            <br />
          </Fragment>
        ) : null}

        <Button variant="contained" color="primary" onClick={registerForm}>
          Register
        </Button>
      </TabPanel>
    </Modal>
  );
}
