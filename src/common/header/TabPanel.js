import React from "react";
import "./TabPanel.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="form-content">
          <p>{children}</p>
        </div>
      )}
    </div>
  );
}

export default TabPanel;
