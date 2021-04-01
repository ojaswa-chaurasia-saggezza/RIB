import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';


import CustomerService from '../Services/Customer.service'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FTWithinBankBeneficiary() {

  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState({});

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState({ error: false, errorText: "" });

  const [allBeneficiaries, setAllBeneficiaries] = useState({});

  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedAccountError, setSelectedAccountError] = useState({ error: false, errorText: "" });

  const [selectedMode, setSelectedMode] = useState('');
  const [selectedModeError, setSelectedModeError] = useState({ error: false, errorText: "" });

  const [selectedBeneficiary, setSelectedBeneficiary] = useState('');
  const [selectedBeneficiaryError, setSelectedBeneficiaryError] = useState({ error: false, errorText: "" });

  const handleSelectedAccount = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleSelectedMode = (event) => {
    setSelectedMode(event.target.value);
  }

  const handleSelectedBeneficiary = (event) => {
    setSelectedBeneficiary(event.target.value);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleFundTransfer = () => {

    if (selectedAccount == "")
      setSelectedAccountError({ error: true, errorText: "Please select an account" });

    if (selectedMode == "")
      setSelectedModeError({ error: true, errorText: "Please select a transfer mode" });

    if (selectedBeneficiary == "")
      setSelectedBeneficiaryError({ error: true, errorText: "Please select a benefeciary" });

    if (amount == "")
      setAmountError({ error: true, errorText: "Please enter the amount" });

    if (selectedAccount != "" && selectedMode != "" && selectedBeneficiary != "" && amount != "") {
      CustomerService.fundTransferWithinBankBeneficiary(selectedAccount, selectedBeneficiary, selectedMode, amount).then(() => {
        handleClick();
      },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setAmountError({ error: true, errorText: resMessage });
        });
    }
  }

  useEffect(() => {
    CustomerService.getAccounts().then((response) => {
      if (response.data)
        setAccounts(response.data);
    },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      });

    CustomerService.getAllBeneficiaries().then((response) => {
      if (response.data)
        setAllBeneficiaries(response.data);
    }, (error) => {
      const _content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      setAllBeneficiaries({});
      console.log("Error:      " + _content);

    });
  }, []);

  return (
    <React.Fragment>
      <div class="content">
        <section class="trasfer-beneficiary">
          <h1 class="title">Transfer within bank Beneficiary</h1>
          <div class="container">
            <div class="transfer-form row">

              <div class="form-field col-lg-6">
                <FormControl fullWidth error={selectedAccountError.error}>
                  <InputLabel id="from-account">From account</InputLabel>
                  <Select
                    labelId="from-account"
                    value={selectedAccount}
                    onChange={(e) => { handleSelectedAccount(e); setSelectedAccountError({ error: false, errorText: '' }) }}
                  >
                    {
                      Object.entries(accounts).map(([key, value]) => {
                        return <MenuItem value={value.accountNumber}>{value.accountNumber}</MenuItem>
                      })
                    }
                  </Select>
                  {selectedAccountError.error && <FormHelperText>{selectedAccountError.errorText}</FormHelperText>}
                </FormControl>
              </div>

              <div class="form-field col-lg-6">
                <FormControl fullWidth error={selectedModeError.error}>
                  <InputLabel id="transfer-mode">Transfer mode</InputLabel>
                  <Select
                    labelId="transfer-mode"
                    value={selectedMode}
                    onChange={(e) => { handleSelectedMode(e); setSelectedModeError({ error: false, errorText: '' }) }}
                  >
                    <MenuItem value='NEFT'>NEFT</MenuItem>
                    <MenuItem value='RTGS'>RTGS</MenuItem>
                    <MenuItem value='IMPS'>IMPS</MenuItem>
                  </Select>
                  {selectedModeError.error && <FormHelperText>{selectedModeError.errorText}</FormHelperText>}
                </FormControl>
              </div>

              <div class="form-field col-lg-6">
                <FormControl fullWidth error={selectedBeneficiaryError.error}>
                  <InputLabel id="beneficiary">Beneficiary</InputLabel>
                  <Select
                    labelId="beneficiary"
                    value={selectedBeneficiary}
                    onChange={(e) => { handleSelectedBeneficiary(e); setSelectedBeneficiaryError({ error: false, errorText: '' }) }}
                  >
                    {
                      Object.entries(allBeneficiaries).map(([key, value]) => {
                        return <MenuItem value={value.nickName}>{value.nickName}</MenuItem>
                      })
                    }
                  </Select>
                  {selectedBeneficiaryError.error && <FormHelperText>{selectedBeneficiaryError.errorText}</FormHelperText>}
                </FormControl>
              </div>

              <div class="form-field col-lg-6">
                <TextField
                  id="amount"
                  required
                  fullWidth
                  label="Amount"
                  type="number"
                  onChange={e => { setAmount(e.target.value) }}
                  onKeyPress={() => { if (amount != "") setAmountError({ error: false, errorText: "" }) }}
                  error={amountError.error}
                  helperText={amountError.errorText}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }} />
              </div>

              <div class="form-field col-lg-12">
                <input class="submit-btn bg-success" type="submit" value="submit" name="" onClick={handleFundTransfer} />
              </div>

            </div>
          </div>
        </section>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Fund transfered Successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>

  );
}
