import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function ForgotPasswordDialog(props) {

    const [isForgotPassword, setIsForgotPassword] = useState(true);
    const handleForgotPassword = () => {
        setIsForgotPassword(true);
    }
    const handleForgotUsername = () => {
        setIsForgotPassword(false);
    }
return (
    <div>
      <Dialog open={props.open} onClose={props.handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Forgot Password / Username</DialogTitle>
        <DialogContent>
            <RadioGroup row aria-label="position" name="position" defaultValue="Forgot Password">
                <FormControlLabel 
                    value="Forgot Password" 
                    control={<Radio color="primary" />} 
                    label="Forgot Password"
                    onClick={handleForgotPassword}
                />
                <FormControlLabel 
                    value="Forgot Username" 
                    control={<Radio color="primary" />} 
                    label="Forgot Username"
                    onClick={handleForgotUsername}
                />
            </RadioGroup>
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="passwordOrUsername"
            error={props.error.error}
            helperText={props.error.errorText}
            onChange={(e) => { props.setForgot(e.target.value) }}
            onKeyPress={(e) => { if (e.target.value != "") props.setError({ error: false, errorText: "" }) }}
            label={isForgotPassword?"Username":"Email ID"}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
              isForgotPassword?props.forgotPassword():props.forgotUsername();
          }} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}