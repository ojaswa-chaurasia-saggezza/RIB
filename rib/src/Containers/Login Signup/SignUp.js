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
import { Link as RouteLink } from 'react-router-dom';
import FormDialog from '../../Elements/FormDialog';
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from '@material-ui/core/colors';

import AuthService from "../../Services/Auth.service";
import CustomerService from "../../Services/Customer.service";
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
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    label: {
        backgroundColor: "white"
    }
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp(props) {
    const classes = useStyles();
    const [dialogVariable, setdialogVariable] = React.useState([]);
    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);

    const [Otp, setOtp] = useState(0);


    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState({ error: false, errorText: "" });

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState({ error: false, errorText: "" });

    const [loading, setLoading] = useState(false);  // This is for loading when the login process is in place

    const [otpError, setOtpError] = useState({ error: false, errorText: "" });

    const handleClick = () => {
        setOpenSnack(true);
    };


    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };
    const verify = () => {

        if (Otp < 1000000 && Otp > 100000) {


            CustomerService.validateOTP(Otp).then((response) => {
                if (response.data.split(":")[0] == "True ") {
                    handleClose();
                    handleClick();
                    setTimeout(() => {
                        props.history.push("/ResetPassword");
                    }, 2000);

                }
                else {
                    setOtpError({ error: true, errorText: response.data });

                }

            },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setUsernameError({ error: false, errorText: "" });
                    setPasswordError({ error: true, errorText: resMessage })
                    console.log(resMessage);
                });


        }
        else
            setOtpError({ error: true, errorText: "The Otp is not in the defined range" })

    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };




    const handleSignUp = (e) => {
        e.preventDefault();

        setLoading(true);

        if (username == "") {
            setUsernameError({ error: true, errorText: "Username should not be empty" }); return;
        }
        if (password == "") {
            setPasswordError({ error: true, errorText: "Password should not be empty" }); return;
        }

        AuthService.signUp(username, password).then((response) => {
            if (response.data.accessToken) {

                localStorage.setItem("SignUpToken", JSON.stringify(response.data));

                const signUpCredentials = JSON.parse(localStorage.getItem('SignUpToken'));
                console.log(signUpCredentials);


                CustomerService.generateOTP().then(() => {
                    handleClickOpen();
                    setLoading(false);
                });

            }


        }, (error) => {

            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            setLoading(false);
            console.log(resMessage);
            setUsernameError({ error: false, errorText: "" });
            setPasswordError({ error: true, errorText: resMessage })


        });



    }



    return (
        <Container component="main" maxWidth="xs">
            {dialogVariable}

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <div className={classes.form} noValidate>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{
                                    classes: {
                                        root: classes.label
                                    }
                                }}
                                variant="outlined"
                                error={usernameError.error}
                                helperText={username.errorText}
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
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
                                error={passwordError.error}
                                helperText={passwordError.errorText}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onKeyPress={(e) => { if (e.key == "Enter") handleSignUp(e); if (password != "") setPasswordError({ error: false, errorText: "" }) }}

                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.wrapper}>
                        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                            <Alert onClose={handleSnackClose} severity="success">
                                SignUp Successfully! Redirecting to Reset Password page...
                        </Alert>
                        </Snackbar>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            color="primary"
                            className={classes.submit}
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>


                    <FormDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} verify={verify} error={otpError} setOtp={setOtp} />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <RouteLink to="/">
                                Already have an account? Sign in
                            </RouteLink>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Box mt={5}>
                {/* <Copyright /> */}
            </Box>
        </Container>
    );
}