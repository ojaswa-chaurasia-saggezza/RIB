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

export default function Pay() {

    const [open, setOpen] = useState(false);
    const [accounts, setAccounts] = useState({});
    const [descriptionList, setDescriptionList] = useState({});

    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedAccountError, setSelectedAccountError] = useState({ error: false, errorText: "" });

    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedDescriptionError, setSelectedDescriptionError] = useState({ error: false, errorText: "" });

    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState({ error: false, errorText: "" });

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handlePay = () => {

        if (selectedAccount == "")
            setSelectedAccountError({ error: true, errorText: "Please select an account" });

        if (selectedDescription == "")
            setSelectedDescriptionError({ error: true, errorText: "Please select a biller description" });

        if (amount == "")
            setAmountError({ error: true, errorText: "Amount should not be empty" });

        if (selectedAccount != "" && selectedDescription != "" && amount != "") {
            CustomerService.pay(selectedAccount, selectedDescription, amount).then(() => {
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
        CustomerService.getAllBillers().then((response) => {
            if (response.data)
                setDescriptionList(response.data);
        },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            });

    }, []);


    return (
        <React.Fragment>
            <div class="content">
                <section class="trasfer-beneficiary">
                    <h1 class="title">Pay Bill</h1>
                    <div class="container">
                        <div class="transfer-form row">

                            <div class="form-field col-lg-6">
                                <FormControl fullWidth error={selectedAccountError.error}>
                                    <InputLabel id="from-account">From account</InputLabel>
                                    <Select
                                        labelId="from-account"
                                        value={selectedAccount}
                                        onChange={(e) => { setSelectedAccount(e.target.value); setSelectedAccountError({ error: false, errorText: '' }) }}
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
                                <FormControl fullWidth error={selectedDescriptionError.error}>
                                    <InputLabel id="description">Description</InputLabel>
                                    <Select
                                        labelId="description"
                                        value={selectedDescription}
                                        onChange={(e) => { setSelectedDescription(e.target.value); setSelectedDescriptionError({ error: false, errorText: '' }) }}
                                    >
                                        {
                                            Object.entries(descriptionList).map(([key, value]) => {
                                                return <MenuItem value={value.description}>{value.description}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    {selectedDescriptionError.error && <FormHelperText>{selectedDescriptionError.errorText}</FormHelperText>}
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
                                <input class="submit-btn bg-success" type="submit" value="submit" name="" onClick={handlePay} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Bill payed Successfully!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}
