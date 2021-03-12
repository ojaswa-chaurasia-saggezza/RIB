import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {

  const [Otp, setOtp] = useState(0);

  const [error, setError] = useState({ error: false, errorText: "" });
  const verify = () => {

    if (Otp < 1000000 && Otp > 100000) {
      console.log("jlkdsjfl");
      props.handleClose();
    }
    else
      setError({ error: true, errorText: "The Otp is not in the defined range" })

  }

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={props.handleClickOpen}>
        Verify
      </Button> */}
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Verify OTP</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            error={error.error}
            helperText={error.errorText}
            onChange={(e) => { setOtp(Number(e.target.value)) }}
            label="Otp"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            verify();
          }} color="primary">
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}