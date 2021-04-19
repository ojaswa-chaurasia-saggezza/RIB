import React, {useState} from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CustomerService from "../Services/Customer.service";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ResetPassword() {

    const[open, setOpen] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState({error:false, errorText:''});

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState({error:false, errorText:''});

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState({error:false, errorText:''});

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    var passwordStrength = (pass) => {
        var strength = 1;
        var arr = [/^.{8,16}$/, /[a-z]+/, /[0-9]+/, /[A-Z]+/, /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/];
        arr.map(function (regexp) {
            if (pass.match(regexp))
                strength++;
        });
        return strength
    }

    const handleResetPassword = () => {
        if (currentPassword == "") {
            setCurrentPasswordError({ error: true, errorText: "Current Password should not be empty" });
            return;
        }
        if (newPassword == "") {
            setNewPasswordError({ error: true, errorText: "Password should not be empty" });
            return;
        }
        if (passwordStrength(newPassword) <= 5) {
            setNewPasswordError({ error: true, errorText: "The password must be of 8-16 letters and include atleast one small letter, capital letter, digit and a special character" });
            return;
        }
        if (confirmPassword == "") {
            setConfirmPasswordError({ error: true, errorText: "Confirm Password should not be empty" });
            return;
        }
        if (newPassword != confirmPassword) {
            setConfirmPasswordError({ error: true, errorText: "Confirm password does not match with the given password" });
            return;
        }
        if (currentPassword != "" && newPassword != "" && confirmPassword != "")
            CustomerService.resetPasswordAfterLogin(currentPassword, newPassword).then((response) => {

                if (response.data) {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    handleClick();
                }
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCurrentPasswordError({ error: true, errorText: resMessage });
            });
    }

    return (
        <React.Fragment>
            <div class="content">
                <section class="trasfer-beneficiary">
                    <h1 class="title">Reset Password</h1>
                    <div class="container">
                        <div class="transfer-form row">

                            <div class="form-field col-lg-6">
                                <TextField
                                    id="current-password"
                                    required
                                    fullWidth
                                    type="password"
                                    label="Current Password"
                                    value={currentPassword}
                                    onChange={(e) => { setCurrentPassword(e.target.value) }}
                                    onKeyPress={() => { if (currentPassword != "") setCurrentPasswordError({ error: false, errorText: "" }) }}
                                    error={currentPasswordError.error}
                                    helperText={currentPasswordError.errorText} />
                            </div>
                            <div class="form-field col-lg-6">
                                <TextField
                                    id="new-password"
                                    required
                                    fullWidth
                                    type="password"
                                    label="New Password"
                                    value={newPassword}
                                    onChange={(e) => { setNewPassword(e.target.value) }}
                                    onKeyPress={() => { if (newPassword != "") setNewPasswordError({ error: false, errorText: "" }) }}
                                    onChange={(e) => {
                                        if (passwordStrength(e.target.value) <= 5)
                                            setNewPasswordError({ error: true, errorText: "The password must be of 8-16 letters and include atleast one small letter, capital letter, digit and a special character" });
                                        else
                                            setNewPasswordError({ error: false, errorText: "" });
    
    
                                        setNewPassword(e.target.value);
                                    }}
                                    error={newPasswordError.error}
                                    helperText={newPasswordError.errorText} />
                            </div>
                            <div class="form-field col-lg-6">
                                <TextField
                                    id="confirm-password"
                                    required
                                    fullWidth
                                    label="Confirm Password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                    onKeyPress={() => { if (confirmPassword != "") setConfirmPasswordError({ error: false, errorText: "" }) }}
                                    error={confirmPasswordError.error}
                                    helperText={confirmPasswordError.errorText} />
                            </div>
                            <div class="form-field col-lg-12">
                                <input class="submit-btn bg-success" type="submit" value="submit" name="" onClick={handleResetPassword}/>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Password reset successfully
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}
