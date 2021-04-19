import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';
import CustomerService from "../Services/Customer.service";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { error } from 'jquery';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ChequeRequest() {
    const [listOfAccounts, setListOfAccounts] = useState([]);
    const [fromAccount, setFromAccount] = useState();
    const [leaf, setLeaf] = useState(10);
    const [open, setOpen] = React.useState({ open: false, text: '' });

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
        <div class="content">
            <section class="trasfer-beneficiary">
                <h1 class="title">Create New Cheque Request</h1>
                <div class="container">
                    <div class="transfer-form row">

                        <div class="form-field col-lg-6">
                            <label for="from-account" class="label drop-label text-primary">From account</label>
                            <select id="from-account" onChange={(e) => { setFromAccount(e.target.value) }} class="form-select" aria-label="Default select example">
                                {
                                    listOfAccounts.map((value) => { return <option value={value} key={value}>{value}</option> })
                                }

                            </select>
                        </div>

                        <div class="form-field col-lg-6">
                            <label for="leaf" class="label drop-label text-primary">Leaf</label>
                            <select id="leaf" onChange={(e) => { setLeaf(e.target.value) }} class="form-select" aria-label="Default select example">
                                <option selected value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
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
    );
}
