"use client";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

export interface MuiToastProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

const MuiToast: React.FC<MuiToastProps> = ({ open, message, severity = "info", onClose, autoHideDuration = 4000 }) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default MuiToast;
