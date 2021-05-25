import React from "react";

import Snackbar from "@material-ui/core/Snackbar";

import Alert from "@material-ui/lab/Alert";

export default function MySnackbar({
  showSnackBar,
  setShowSnackBar,
  message,
  severity,
}) {
  return (
    <div>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={setShowSnackBar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert onClose={setShowSnackBar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

MySnackbar.defaultProps = {
  severity: "success",
};
