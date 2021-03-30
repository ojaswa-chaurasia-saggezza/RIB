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


import CustomerService from '../Services/Customer.service'

export default function FTWithinBankBeneficiary() {

  const [accounts, setAccounts] = useState({});
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState({ error: false, errorText: "" });
  const [allBeneficiaries, setAllBeneficiaries] = useState({});
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('');

  const handleSelectedAccount = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleSelectedMode = (event) => {
    setSelectedMode(event.target.value);
  }

  const handleSelectedBeneficiary = (event) => {
    setSelectedBeneficiary(event.target.value);
  }

  useEffect(() => {
    const accountsList = CustomerService.getAccounts().then((response) => {
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

  return (
    <div class="content">
      <section class="trasfer-beneficiary">
        <h1 class="title">Transfer within bank Beneficiary</h1>
        <div class="container">
          <div class="transfer-form row">

            <div class="form-field col-lg-6">
              <FormControl fullWidth>
                <InputLabel id="from-account">From account</InputLabel>
                <Select
                  labelId="from-account"
                  value={selectedAccount}
                  onChange={handleSelectedAccount}
                >
                  {
                    Object.entries(accounts).map(([key, value]) => {
                      return <MenuItem value={key}>{value.accountNumber}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </div>

            <div class="form-field col-lg-6">
              <FormControl fullWidth>
                <InputLabel id="transfer-mode">Transfer mode</InputLabel>
                <Select
                  labelId="transfer-mode"
                  value={selectedMode}
                  onChange={handleSelectedMode}
                  >
                    <MenuItem value={1}>NEFT</MenuItem>
                    <MenuItem value={2}>RTGS</MenuItem>
                    <MenuItem value={3}>IMPS</MenuItem>
                  </Select>
              </FormControl>
            </div>

            <div class="form-field col-lg-6">
              <FormControl fullWidth>
                <InputLabel id="beneficiary">Beneficiary</InputLabel>
                <Select
                  labelId="beneficiary"
                  value={selectedBeneficiary}
                  onChange={handleSelectedBeneficiary}
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
                }}/>
            </div>
            <div class="form-field col-lg-12">
              <input class="submit-btn bg-success" type="submit" value="submit" name="" />
            </div>

          </div>
        </div>
      </section>
    </div>

  );
}
