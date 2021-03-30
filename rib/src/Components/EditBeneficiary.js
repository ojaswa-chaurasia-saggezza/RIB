import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import CustomerService from '../Services/Customer.service';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Editbeneficiary() {
  const [open, setOpen] = React.useState(false);

  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberError, setAccountNumberError] = useState({ error: false, errorText: "" });;
  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState({ error: false, errorText: "" });;
  const [ifsc, setIfsc] = useState("");
  const [ifscError, setIfscError] = useState({ error: false, errorText: "" });;
  const [selectedAccount, setSelectedAccount] = useState('');
  const [allBeneficiaries, setAllBeneficiaries] = useState({});

  const handleSelectedAccount = (event) => {
    setSelectedAccount(event.target.value);
  };

  useEffect(() => {
    CustomerService.getAllBeneficiaries().then((response) => {
      if (response.data)
        setAllBeneficiaries(response.data);
      console.log(response.data);
    }, (error) => {
      const _content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      setAllBeneficiaries({});
      console.log(_content);

    });

  }, []);



  const handleClick = () => {
    setOpen(true);
  }
  const handleEditbeneficiary = () => {
    if (accountNumber == '')
      setAccountNumberError("Enter Valid account number");

    if (nickName == '')
      setNickNameError("Nickname must be unique");

    if (ifsc == '')
      setIfscError("Entered Otp is not correct");

    if (accountNumber != "" && nickName != "" && ifsc != "") {
      CustomerService.editBeneficiary(accountNumber, nickName, ifsc).then(() => {
        handleClick();
      });
    }

  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div class="content">
      <section class="trasfer-beneficiary">
        <h1 class="title">Edit Beneficiary</h1>
        <div class="container">
          <div class="transfer-form row">
            <div class="form-field col-lg-6">
              <FormControl fullWidth>
                <InputLabel id="beneficiary">Beneficiary</InputLabel>
                <Select
                  labelId="beneficiary"
                  value={selectedAccount}
                  onChange={handleSelectedAccount}
                >
                  {
                    Object.entries(allBeneficiaries).map(([key, value]) => {
                      return <MenuItem value={key}>{value.nickName}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </div>

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
                onChange={e => setNickName(e.target.value)}
                onKeyPress={() => { if (nickName != "") setNickNameError({ error: false, errorText: "" }) }}
                error={nickNameError.error}
                helperText={nickNameError.errorText} />
            </div>

            <div class="form-field col-lg-6">
              <TextField
                id="ifsc"
                required
                fullWidth
                label="IFSC"
                onChange={e => setIfsc(e.target.value)}
                onKeyPress={() => { if (ifsc != "") setIfscError({ error: false, errorText: "" }) }}
                error={ifscError.error}
                helperText={ifscError.errorText} />
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Beneficiary added Successfully!
                        </Alert>
            </Snackbar>
            <div class="row justify-content-center">
              <div class="form-field col-lg-4">
                <input class="submit-btn bg-success" type="submit" value="submit" name="" onClick={handleEditbeneficiary} />
              </div>

              <div class="form-field col-lg-4">
                <input class="submit-btn bg-danger" type="submit" value="Delete" data-bs-toggle="modal"
                  data-bs-target="#deleteModal" name="" />
              </div>

            </div>


          </div>
        </div>
      </section>
    </div>
  );
}