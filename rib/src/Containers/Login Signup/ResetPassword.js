import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormDialog from '../../Elements/FormDialog';
import { Link as RouteLink } from "react-router-dom";
import CustomerService from "../../Services/Customer.service";
import { PinDropSharp } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    label: {
        backgroundColor: "white"
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ResetPassword(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    if (!JSON.parse(localStorage.getItem('SignUpToken'))) {
        props.history.push('/SignUp');
    }


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState({ error: false, errorText: "" });

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState({ error: false, errorText: "" });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState({ error: false, errorText: "" });

    const handleResetPassword = () => {

        console.log("Inside handleResetPassword" + username + password + confirmPassword);

        if (username == "") {
            setUsernameError({ error: true, errorText: "Username should not be empty" });
            return;
        }
        if (password == "") {
            setPasswordError({ error: true, errorText: "Password should not be empty" });
            return;
        }

        if (confirmPassword == "") {
            setConfirmPasswordError({ error: true, errorText: "Confirm Password should not be empty" });
            return;
        }

        if (password != confirmPassword) {
            setConfirmPasswordError({ error: true, errorText: "Confirm password does not match with the given password" });
            return;
        }


        if (username != "" && password != "" && confirmPassword != "")
            CustomerService.resetPassword(username, password).then((response) => {

                if (response.data) {

                    handleClick();
                    setTimeout(() => {
                        props.history.push("/");
                        localStorage.clear();
                    }, 2000);

                }
            },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setUsernameError({ error: true, errorText: resMessage });
                    console.log(resMessage);
                });

    };

    return (
        <Container component="main" maxWidth="xs">

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
        </Typography>
                <div className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{
                                    classes: {
                                        root: classes.label
                                    }
                                }}
                                variant="outlined"
                                required
                                fullWidth
                                error={usernameError.error}
                                helperText={usernameError.errorText}
                                name="current-password"
                                label="Current Password"
                                type="current-password"
                                id="current-password"
                                autoComplete="current-password"
                                onKeyPress={() => { if (username != "") setUsernameError({ error: false, errorText: "" }) }}
                                onChange={(e) => { setUsername(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{
                                    classes: {
                                        root: classes.label
                                    }
                                }}
                                variant="outlined"
                                required
                                fullWidth
                                error={passwordError.error}
                                helperText={passwordError.errorText}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onKeyPress={() => { if (password != "") setPasswordError({ error: false, errorText: "" }) }}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{
                                    classes: {
                                        root: classes.label
                                    }
                                }}
                                variant="outlined"
                                required
                                fullWidth
                                error={confirmPasswordError.error}
                                helperText={confirmPasswordError.errorText}
                                name="confirm-password"
                                label="Confirm Password"
                                type="confirm-password"
                                id="confirm-password"
                                autoComplete="current-password"
                                onKeyPress={() => { if (confirmPassword != "") setConfirmPasswordError({ error: false, errorText: "" }) }}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            />
                        </Grid>
                    </Grid>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Password reset successfuly! Redirecting...
                        </Alert>
                    </Snackbar>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleResetPassword}
                    >
                        Change Password
          </Button>
                </div>
            </div>
            <Box mt={5}>
                {/* <Copyright /> */}
            </Box>
        </Container>
    );
}


export default ResetPassword;