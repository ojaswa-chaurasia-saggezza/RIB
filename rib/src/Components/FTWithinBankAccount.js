import React, { Suspense, useEffect, useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';

import CustomerService from '../Services/Customer.service';
import MetaDataService from "../Services/MetaData.sevice";

import PlainDialog from "../Elements/PlainDialog";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function FTWithinBankAccount() {

    const [termsAndConditions, setTermsAndConditions] = useState("Empty");
    const [openTNC, setOpenTNC] = React.useState(false);

    const [open, setOpen] = useState(false);
    const [accounts, setAccounts] = useState({});

    const [fromAccount, setFromAccount] = useState('');
    const [fromAccountError, setFromAccountError] = useState({ error: false, errorText: '' });

    const [toAccount, setToAccount] = useState('');
    const [toAccountError, setToAccountError] = useState({ error: false, errorText: '' });

    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState({ error: false, errorText: '' });

    const handleCloseTNC = () => {
        setOpenTNC(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleFundTransfer = () => {
        if (fromAccount == '')
            setFromAccountError({ error: true, errorText: 'Please select a from account number' });
        if (toAccount == '')
            setToAccountError({ error: true, errorText: 'Please select a to account number' });
        if (amount == '')
            setAmountError({ error: true, errorText: 'Please enter the amount' });

        if (fromAccount != '' && toAccount != '' && amount != '') {
            CustomerService.fundTransferWithinBankAccount(fromAccount, toAccount, amount).then(() => {
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
    }, []);

    useEffect(() => {
        MetaDataService.getTermsAndConditions().then((response) => {
            if (response.data)
                setTermsAndConditions(response.data);

        });
    }, []);


    return (
        <React.Fragment>
            <div class="content">
                <section class="trasfer-beneficiary">
                    <h1 class="title">Transfer within your accounts</h1>
                    <div class="container">
                        <div class="transfer-form row">

                            <div class="form-field col-lg-6">
                                <FormControl fullWidth error={fromAccountError.error}>
                                    <InputLabel id="from-account">From account</InputLabel>
                                    <Select
                                        labelId="from-account"
                                        value={fromAccount}
                                        onChange={(e) => { setFromAccount(e.target.value); setFromAccountError({ error: false, errorText: '' }) }}
                                    >
                                        {
                                            Object.entries(accounts).map(([key, value]) => {
                                                return <MenuItem value={value.accountNumber}>{value.accountNumber}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    {fromAccountError.error && <FormHelperText>{fromAccountError.errorText}</FormHelperText>}
                                </FormControl>
                            </div>

                            <div class="form-field col-lg-6">
                                <FormControl fullWidth error={toAccountError.error}>
                                    <InputLabel id="to-account">To account</InputLabel>
                                    <Select
                                        labelId="to-account"
                                        value={toAccount}
                                        onChange={(e) => { setToAccount(e.target.value); setToAccountError({ error: false, errorText: '' }) }}
                                    >
                                        {
                                            Object.entries(accounts).map(([key, value]) => {
                                                return <MenuItem value={value.accountNumber}>{value.accountNumber}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    {toAccountError.error && <FormHelperText>{toAccountError.errorText}</FormHelperText>}
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
                            
                            <div role="button" className="col-lg-12 text-danger text-start " onClick={()=>{setOpenTNC(true)}}> {"*Terms & Conditions"} </div>

                            <div class="form-field col-lg-12">
                                <input class="submit-btn bg-success" type="submit" value="submit" name="" onClick={handleFundTransfer} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>


            <PlainDialog data={termsAndConditions} open={openTNC} handleClose={handleCloseTNC} title="Terms and Contitions for Fund Transfer" />
        </React.Fragment>
    );
}
