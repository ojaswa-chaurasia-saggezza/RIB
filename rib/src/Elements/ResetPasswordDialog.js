import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function ResetPasswordDialog(props) {

return (
    <div>
      <Dialog open={props.open} onClose={props.handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Use the temporary password sent to your mail id.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="tempPassword"
                label="Temporary Password"
                type="password"
                error={props.tempError.error}
                helperText={props.tempError.errorText}
                onChange={(e) => { props.setTempPassword(e.target.value) }}
                onKeyPress={(e) => { if (e.target.value != "") props.setTempError({ error: false, errorText: "" }) }}
                fullWidth
            />
            <TextField
                margin="dense"
                id="newPassword"
                label="New Password"
                type="password"
                error={props.newError.error}
                helperText={props.newError.errorText}
                onChange={(e) => { props.setNewPassword(e.target.value) }}
                onKeyPress={(e) => { if (e.target.value != "") props.setNewError({ error: false, errorText: "" }) }}
                fullWidth
            />
            <TextField
                margin="dense"
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                error={props.confirmError.error}
                helperText={props.confirmError.errorText}
                onChange={(e) => { props.setConfirmPassword(e.target.value) }}
                onKeyPress={(e) => { if (e.target.value != "") props.setConfirmError({ error: false, errorText: "" }) }}
                fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            props.resetPassword();
          }} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}