import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';    
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';

import CustomerService from '../Services/Customer.service'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditBiller() {

    const [billerList, setBillerList] = useState({});
    const [descriptionList, setDescriptionList] = useState({});
    const [open, setOpen] = useState({ open: false, text: '' });

    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState({ error: false, errorText: '' });

    const [biller, setBiller] = useState('');
    const [billerError, setBillerError] = useState({ error: false, errorText: '' });

    const [accountNumber, setAccountNumber] = useState('');
    const [accountNumberError, setAccountNumberError] = useState({ error: false, errorText: '' });

    const handleClick = (data) => {
        setOpen({ open: true, text: data.message });
    };

    const handleClose = () => {
        setOpen({ open: false, text: '' });
    }

    const handleSetBiller = (e) => {
        const billerName = descriptionList[e.target.value].globalBiller.billerName;
        console.log("namwa " + billerName);

        let index = 0;
        Object.entries(billerList).map(([key, value]) => {
            if (value.billerName == billerName) {
                index = key;
                return;
            }
        });
        setBiller(billerList[index].billerName);
        console.log("indexwa " + index);
    }

    const handleEditBiller = () => {

        console.log("biller name" + biller);
        console.log("biller account number" + accountNumber);
        console.log("description hai" + description);

        if (biller == "") {
            setBillerError({ error: true, errorText: "Please select a biller" });
        }
        if (accountNumber == "") {
            setAccountNumberError({ error: true, errorText: "Account Number should not be empty" });
        }
        if (description == "") {
            setDescriptionError({ error: true, errorText: "Description should not be empty" });
        }

        if (biller != "" && accountNumber != "" && description != "") {
            const desc = descriptionList[description].description;
            CustomerService.editBiller(biller, accountNumber, desc).then(() => {
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

    const handleDeleteBiller = () => {
        console.log("description dekh loooooo |"+description+"|");
        CustomerService.deleteBiller(description).then((response) => {
            console.log("description dekh loooooo "+description);
            handleClick(response.data);
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

    useEffect(() => {
        CustomerService.getAllGlobalBillers().then((response) => {
            if (response.data)
                setBillerList(response.data);
            setBiller(response.data[0].biller);
            setAccountNumber(response.data[0].accountNumber);
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
        <div class="content">
            <section class="trasfer-beneficiary">
                <h1 class="title">Edit Biller</h1>
                <div class="container">
                    <div class="transfer-form row">
                        <div class="form-field col-lg-6">
                            <FormControl fullWidth error={billerError.error}>
                                <InputLabel id="description">Description</InputLabel>
                                <Select
                                    labelId="description"
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value); handleSetBiller(e); setAccountNumber(descriptionList[e.target.value].billerAccountNumber) }}
                                >
                                    {
                                        Object.entries(descriptionList).map(([key, value]) => {
                                            return <MenuItem value={key}>{value.description}</MenuItem>
                                        })
                                    }
                                </Select>
                                {billerError.error && <FormHelperText>{billerError.errorText}</FormHelperText>}
                            </FormControl>
                            {console.log(biller)}
                        </div>

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
                                value={accountNumber}
                                onChange={(e) => { setAccountNumber(e.target.value) }}
                                onKeyPress={() => { if (accountNumber != "") setAccountNumberError({ error: false, errorText: "" }) }}
                                error={accountNumberError.error}
                                helperText={accountNumberError.errorText} />
                        </div>
                        <Snackbar open={open.open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                {open.text}
                            </Alert>
                        </Snackbar>

                        <div class="row justify-content-center">
                            <div class="form-field col-lg-4">
                                <input class="submit-btn bg-success" type="submit" value="submit" name="" onClick={handleEditBiller} />
                            </div>
                            <div class="form-field col-lg-4">
                                <input class="submit-btn bg-danger" type="submit" value="delete" data-bs-toggle="modal"
                                    data-bs-target="#deleteModal" name="" onClick={handleDeleteBiller} />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>

    );
}
