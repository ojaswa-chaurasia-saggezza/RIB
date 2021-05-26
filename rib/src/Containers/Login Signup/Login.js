import React, { useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Link, useHistory } from 'react-router-dom';
import LinkM from '@material-ui/core/Link';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { ContactSupportOutlined, HistoryRounded, LaptopWindows } from '@material-ui/icons';

import AuthService from "../../Services/Auth.service";
import CustomerService from "../../Services/Customer.service";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ForgotPasswordDialog from '../../Elements/ForgotPasswordDialog';
import ResetPasswordDialog from '../../Elements/ResetPasswordDialog';
import ForgotService from "../../Services/Forgot.service";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    backgroundColor: "#fafafa"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 10000,
    color: '#fff',
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// This is the main login funciton that is being exported
export default function Login(props) {
  const [open, setOpen] = React.useState(false); 
  const [forgot, setForgot] = useState('');
  const [openForgotDialog, setOpenForgotDialog] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);

  const [dialogError, setDialogError] = useState({ error: false, errorText: '' });

  const [tempPassword, setTempPassword] = useState('');
  const [tempError, setTempError] = useState({ error: false, errorText: '' });
  const [newPassword, setNewPassword] = useState('');
  const [newError, setNewError] = useState({ error: false, errorText: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState({ error: false, errorText: '' });

  const classes = useStyles();  // for styling


  const [whereTo, changeWhereTo] = useState('');
  const [user_name, changeusername] = useState(''); //The Username in the input
  const [usernameError, setUsernameError] = useState({ error: false, errorText: "" });

  const [pass_word, changepassword] = useState(''); // The password in the input
  const [passwordError, setPasswordError] = useState({ error: false, errorText: "" });

  const HISTORY = useHistory();

  const [loading, setLoading] = useState(false);  // This is for loading when the login process is in place
  const [loadingMail, setLoadingMail] = useState(false);
  const [message, setMessage] = useState(""); // Message to be displayed

  const handleClick = () => {
    setOpen(true);
  };
  const handleOpenForgotDialog = () => {
    setOpenForgotDialog(true);
  }
  const handleCloseForgotDialog = () => {
    setDialogError({ error: false, errorText: '' });
    setOpenForgotDialog(false);
  }

  const handleOpenResetDialog = () => {
    setOpenResetDialog(true);
  }
  const handleCloseResetDialog = () => {
    setForgot('');
    setTempPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTempError({ error: false, errorText: '' });
    setNewError({ error: false, errorText: '' });
    setConfirmError({ error: false, errorText: '' });
    setOpenResetDialog(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  var passwordStrength = (pass) => {
    var strength = 1;
    var arr = [/^.{8,16}$/, /[a-z]+/, /[0-9]+/, /[A-Z]+/, /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/];
    arr.map(function (regexp) {
      if (pass.match(regexp))
        strength++;
    });
    console.log(strength);
    return strength
  }

  const forgotPassword = () => {
    setLoadingMail(true);
    ForgotService.generateTempPassword(forgot).then(() => {
      handleCloseForgotDialog();
      setLoadingMail(false);
      handleOpenResetDialog();
    },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoadingMail(false);

        setDialogError({ error: true, errorText: resMessage })
      });

  }

  const forgotUsername = () => {
    setLoadingMail(true);
    ForgotService.forgotUsername(forgot).then(() => {
      handleCloseForgotDialog();
      setLoadingMail(false);
    },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoadingMail(false);
        setDialogError({ error: true, errorText: resMessage })
      });


  }

  const resetPassword = () => {
    if (tempPassword == "")
      setTempError({ error: true, errorText: 'Temporary password should not be empty' });

    if (newPassword == "")
      setNewError({ error: true, errorText: 'New password should not be empty' });

    else if (passwordStrength(newPassword) <= 5)
      setNewError({ error: true, errorText: "The password must be of 8-16 letters and include atleast one small letter, capital letter, digit and a special character" });

    if (confirmPassword == "")
      setConfirmError({ error: true, errorText: 'Confirm password should not be empty' });

    else if (newPassword != confirmPassword)
      setConfirmError({ error: true, errorText: "Confirm password does not match with the given password" });

    if (tempPassword != "" && newPassword != "" && confirmPassword != "" && passwordStrength(newPassword) > 5) {

      ForgotService.resetTempPassword(forgot, tempPassword, newPassword).then(() => {
        handleCloseResetDialog();
      },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setTempError({ error: true, errorText: resMessage });
        });
    }
  }

  
  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (user_name == "") {
      setUsernameError({ error: true, errorText: "Username should not be empty" });
    }
    if (pass_word == "") {
      setPasswordError({ error: true, errorText: "Password should not be empty" });
    }

    if (user_name != "" && pass_word != "")
      AuthService.login(user_name, pass_word).then(
        () => {
          handleClick();
          setTimeout(() => {
            props.history.push("/Dashboard");
          }, 2000);
          //window.location.reload(); //No need to reload the window
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
          setUsernameError({ error: false, errorText: "" });
          setPasswordError({ error: true, errorText: resMessage })
          console.log(resMessage);
        }
      );
    setLoading(false);
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBalanceIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} >
          <TextField
            InputLabelProps={{
              classes: {
                root: classes.label
              }
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="Username"
            autoComplete="username"
            autoFocus
            onChange={(val) => { changeusername(val.target.value) }}
            onKeyPress={() => { if (user_name != "") setUsernameError({ error: false, errorText: "" }) }}
            error={usernameError.error}
            helperText={usernameError.errorText}

          />
          <TextField
            InputLabelProps={{
              classes: {
                root: classes.label
              }
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(val) => { changepassword(val.target.value) }}
            onKeyPress={(e) => {
              if (e.key == "Enter") handleLogin(e);
              if (pass_word != "") setPasswordError({ error: false, errorText: "" });
            }}
            on={handleLogin}
            autoComplete="current-password"
            error={passwordError.error}
            helperText={passwordError.errorText}
          />
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Login Successfully!
                        </Alert>
          </Snackbar>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to={`/${whereTo}`}
            className={classes.submit}
            onClick={handleLogin}
            disabled={loading}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <LinkM onClick={handleOpenForgotDialog} >
                {"Forgot Password/Username?"}
              </LinkM>
            </Grid>
            <Grid item>
              <Link to="/SignUp"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <ForgotPasswordDialog open={openForgotDialog} handleCloseDialog={handleCloseForgotDialog} forgotPassword={forgotPassword} forgotUsername={forgotUsername} error={dialogError} setError={setDialogError} setForgot={setForgot} />
      <ResetPasswordDialog open={openResetDialog} handleCloseDialog={handleCloseResetDialog} resetPassword={resetPassword} tempError={tempError} setTempError={setTempError} newError={newError} setNewError={setNewError} confirmError={confirmError} setConfirmError={setConfirmError} setTempPassword={setTempPassword} setNewPassword={setNewPassword} setConfirmPassword={setConfirmPassword} />
      <Backdrop className={classes.backdrop} open={loadingMail}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box mt={8}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}