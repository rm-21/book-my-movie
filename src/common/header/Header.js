import React, { useState } from "react";

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
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "./Header.css";
import { makeStyles } from "@material-ui/core/styles";
import { flexbox } from "@mui/system";

export default function Header() {
  // States
  const [loginOpen, setLoginOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [login, setLogin] = useState(true);
  const [success, setSuccess] = useState(false);

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

  return (
    <div className="header">
      <Link to="/">
        <img src={Logo} alt="logo" className="header-logo" />
      </Link>

      <div className="btn-all">
        <Button variant="contained" name="Login">
          Login
        </Button>
      </div>
    </div>
  );
}
