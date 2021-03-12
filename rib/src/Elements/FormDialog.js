import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {

  
  console.log(props.error);

  
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
            error={props.error.error}
            helperText={props.error.errorText}
            onChange={(e) => { props.setOtp(Number(e.target.value)) }}
            label="Otp"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            props.verify();
          }} color="primary">
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}