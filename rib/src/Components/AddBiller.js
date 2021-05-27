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

var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
export default function AddBiller() {

    const [billerList, setBillerList] = useState({});
    const [open, setOpen] = useState(false);

    const [biller, setBiller] = useState('');
    const [billerError, setBillerError] = useState({ error: false, errorText: '' });

    const [accountNumber, setAccountNumber] = useState('');
    const [accountNumberError, setAccountNumberError] = useState({ error: false, errorText: '' });

    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState({ error: false, errorText: '' });

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handeleDescriptionError = () => {
        
        if (description == "") {
            setDescriptionError({ error: true, errorText: "Description should not be empty" });
        }
        else if(description.match(format))
        {
            setDescriptionError({error: true, errorText: "Description should not contain special characters"});
        }
        else if(description.length>15)
        {
            setDescriptionError({error: true, errorText: "Please enter 15 characters only"});
        }
        else {
            setDescriptionError({error: false, errorText: ""});
        }
        

    }

    const handleAddBiller = () => {

        if (biller == "") {
            setBillerError({ error: true, errorText: "Please select a biller" });
        }
        if (accountNumber == "") {
            setAccountNumberError({ error: true, errorText: "Account Number should not be empty" });
        }
        if (biller != "" && accountNumber != "" && description != "" && description.length<15 && !descriptionError.error) {
            CustomerService.addBiller(biller, accountNumber, description).then(() => {
                handleClick();
            },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                });
        }


    }

    useEffect(() => {
        CustomerService.getAllGlobalBillers().then((response) => {
            if (response.data)
                setBillerList(response.data);
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
                    <h1 class="title">Add Biller</h1>
                    <div class="container">
                        <div class="transfer-form row">

                            <div class="form-field col-lg-6">
                                <FormControl fullWidth error={billerError.error}>
                                    <InputLabel id="biller">Biller</InputLabel>
                                    <Select
                                        labelId="biller"
                                        value={biller}
                                        onChange={(e) => { setBiller(e.target.value); setBillerError({ error: false, errorText: '' }) }}
                                    >
                                        {
                                            Object.entries(billerList).map(([key, value]) => {
                                                return <MenuItem value={value.billerName}>{value.billerName}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    {billerError.error && <FormHelperText>{billerError.errorText}</FormHelperText>}
                                </FormControl>
                            </div>

                            <div class="form-field col-lg-6">
                                <TextField
                                    id="account"
                                    required
                                    fullWidth
                                    label="Customer Account Number"
                                    onChange={(e) => { setAccountNumber(e.target.value) }}
                                    onKeyPress={() => { if (accountNumber != "") setAccountNumberError({ error: false, errorText: "" }) }}
                                    error={accountNumberError.error}
                                    helperText={accountNumberError.errorText} />
                            </div>

                            <div class="form-field col-lg-6">
                                <TextField
                                    id="description"
                                    required
                                    fullWidth
                                    label="Description"
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    onKeyPress={() => { if (description != "") handeleDescriptionError() }}
                                    error={descriptionError.error}
                                    helperText={descriptionError.errorText} />
                            </div>


                            <div class="form-field col-lg-12">
                                <input class="submit-btn bg-success" type="submit" value="submit" name="" onClick={handleAddBiller} />
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Biller Added Successfully!
                </Alert>
            </Snackbar>
        </React.Fragment>

    );
}
