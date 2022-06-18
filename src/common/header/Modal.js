import Modal from "react-modal";
import "./Modal.css";
import React from "react";
import { Button } from "@material-ui/core";

export default function LoginModal({ handleModalSubmit }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <Button onClick={() => handleModalSubmit()}>Submit</Button>
      </div>
    </div>
  );
}
