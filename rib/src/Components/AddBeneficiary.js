import React, { useState } from 'react';
import '../CSS/style.css';
import CustomerService from '../Services/Customer.service';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddBeneficiary(props) {

  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberError, setAccountNumberError] = useState({ error: false, errorText: "" });

  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState({ error: false, errorText: "" });

  const [ifsc, setIfsc] = useState("");
  const [ifscError, setIfscError] = useState({ error: false, errorText: "" });

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleAddBeneficiary = () => {

    setLoading(true);

    if (accountNumber == "") {
      setAccountNumberError({ error: true, errorText: "Account Number should not be empty" });
    }
    if (nickName == "") {
      setNickNameError({ error: true, errorText: "Name should not be empty" });
    }
    if (ifsc == "") {
      setIfscError({ error: true, errorText: "IFSC code should not be empty" });
    }

    if (accountNumber != "" && nickName != "" && ifsc != "") {
      CustomerService.addBenefeciary(accountNumber, nickName, ifsc).then(() => {
        handleClick();
      },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          var msg = resMessage.split(':');
          switch (msg[0]) {
            case '1':
              setAccountNumberError({ error: true, errorText: msg[1] });
              break;
            case '2':
              setNickNameError({ error: true, errorText: msg[1] });
              break;
            case '3':
              setIfscError({ error: true, errorText: msg[1] });
              break;
          }
          setLoading(false);
        }
      );
    }
  }


  return (
    <React.Fragment>
      <div class="content">
        <section class="trasfer-beneficiary">
          <h1 class="title bg-primary">Add beneficiary</h1>
          <div class="container">
            <div class="transfer-form row">
              <div class="form-field col-lg-6">
                <TextField
                  id="account"
                  required
                  fullWidth
                  label="Account Number"
                  onChange={(e) => { setAccountNumber(e.target.value) }}
                  onKeyPress={() => { if (accountNumber != "") setAccountNumberError({ error: false, errorText: "" }) }}
                  error={accountNumberError.error}
                  helperText={accountNumberError.errorText} />
              </div>
              <div class="form-field col-lg-6">
                <TextField
                  id="name"
                  required
                  fullWidth
                  label="Name"
                  onChange={(e) => { setNickName(e.target.value) }}
                  onKeyPress={() => { if (accountNumber != "") setNickNameError({ error: false, errorText: "" }) }}
                  error={nickNameError.error}
                  helperText={nickNameError.errorText} />
              </div>
              <div class="form-field col-lg-6">
                <TextField
                  id="ifsc"
                  required
                  fullWidth
                  label="IFSC CODE"
                  onChange={(e) => { setIfsc(e.target.value) }}
                  onKeyPress={() => { if (accountNumber != "") setIfscError({ error: false, errorText: "" }) }}
                  error={ifscError.error}
                  helperText={ifscError.errorText} />
              </div>

              <div class="form-field col-lg-12">
                <input class="submit-btn bg-success" type="submit" value="submit" name="" onClick={handleAddBeneficiary} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Beneficiary Added Successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
