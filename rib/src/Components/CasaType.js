import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import CustomerService from "../Services/Customer.service";
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CasaType() {

  const [accountType, setAccountType] = useState("Saving");
  const [fromAccount, setFromAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [open, setOpen] = React.useState({ open: false, text: '' });

  const types = ['Saving', 'Checking'];

  const handleClose = () => {
    setOpen({ open: false, text: '' });
  }

  const handleClickSubmit = () => {
    CustomerService.requestCASA(accountType, fromAccount).then((response) => {
      if (response.data)
        setOpen({ open: true, text: 'Your response has been recorded' })

    }, (error) => {

    })

  }

  useEffect(() => {
    CustomerService.getCustomerDetails().then(
      (response) => {
        var accountList = response.data.accounts.map((val) => val.accountNumber);
        setAccounts(accountList);
        setFromAccount(accountList[0]);

      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        console.log(_content);
      }
    );

  }, []);

  return (
    <React.Fragment>
      <div class="content" >
        <section class="trasfer-beneficiary">
          <h1 class="title" >Choose the type of Account to be created</h1>
          <div class="container">
            <div class="transfer-form row">

              <div class="form-field col-lg-6">
                <FormControl fullWidth>
                  <InputLabel id="account-type">Account type</InputLabel>
                  <Select
                    labelId="account-type"
                    value={accountType}
                    onChange={e => { setAccountType(e.target.value) }}
                  >
                    {
                      types.map((value) => {
                        return <MenuItem value={value} key={value}>{value}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </div>
              <div class="form-field col-lg-6">
                <FormControl fullWidth>
                  <InputLabel id="account">From Account</InputLabel>
                  <Select
                    labelId="account"
                    value={fromAccount}
                    onChange={e => { setFromAccount(e.target.value) }}
                  >
                    {
                      accounts.map((value) => {
                        return <MenuItem value={value} key={value}>{value}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </div>
              <div class="form-field col-lg-12">
                <input class="submit-btn bg-success" onClick={handleClickSubmit} type="submit" value="submit" name="" />
              </div>
              <Snackbar open={open.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                  {open.text}
                </Alert>
              </Snackbar>

            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}
