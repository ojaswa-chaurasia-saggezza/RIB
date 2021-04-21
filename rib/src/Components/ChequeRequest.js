import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';
import CustomerService from "../Services/Customer.service";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { error } from 'jquery';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ChequeRequest() {
    const [listOfAccounts, setListOfAccounts] = useState([]);
    const [fromAccount, setFromAccount] = useState();
    const [leaf, setLeaf] = useState(10);
    const [open, setOpen] = React.useState({ open: false, text: '' });

    const leafs = [10, 25, 50, 100];

    const handleClose = () => {
        setOpen({ open: false, text: '' });
    }
    useEffect(() => {
        CustomerService.getAccounts().then((response) => {
            console.log(response);
            if (response.data) {
                setListOfAccounts(response.data.map((value) => value.accountNumber));
                setFromAccount(response.data[0].accountNumber);
            }
        }, (error) => {

        })

    }, []);

    const handleSubmit = () => {
        CustomerService.checkOrder(fromAccount, leaf).then(response => {
            if (response.data)
                setOpen({ open: true, text: 'your Response has been recorded' })
        },
            (error) => {
                const _content =
                    (
                        error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setOpen({ open: true, text: _content });

            }
        )
    }

    return (
        <React.Fragment>
            <div class="content">
                <section class="trasfer-beneficiary">
                    <h1 class="title">Create New Cheque Request</h1>
                    <div class="container">
                        <div class="transfer-form row">

                            <div class="form-field col-lg-6">
                                <FormControl fullWidth>
                                    <InputLabel id="from-account">From account</InputLabel>
                                    <Select
                                        labelId="from-account"
                                        value={fromAccount}
                                        onChange={e => { setFromAccount(e.target.value) }}
                                    >
                                        {
                                            listOfAccounts.map((value) => {
                                                return <MenuItem value={value} key={value}>{value}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>

                            <div class="form-field col-lg-6">
                                <FormControl fullWidth>
                                    <InputLabel id="leaf">Leaf</InputLabel>
                                    <Select
                                        labelId="leaf"
                                        value={leaf}
                                        onChange={(e) => { setLeaf(e.target.value) }}
                                    >
                                        {
                                            leafs.map((value) => {
                                                return <MenuItem value={value} key={value}>{value}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <Snackbar open={open.open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                    {open.text}
                                </Alert>
                            </Snackbar>
                            <div class="form-field col-lg-12">
                                <input class="submit-btn bg-success" onClick={handleSubmit} type="submit" value="submit" name="" />
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
}
