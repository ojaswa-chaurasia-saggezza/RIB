import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';
import CustomerService from '../Services/Customer.service';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { error } from 'jquery';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function CreditLimitIncrease() {
    const [creditCardNumber, setCreditCardNumber] = useState();
    const [limit, setLimit] = useState();
    const [creditCardList, setCreditCardList] = useState([]);
    const [open, setOpen] = React.useState({ open: false, text: '' });
    const [currentLimit, setCurrentlimit] = useState(0);

    const handleClose = () => {
        setOpen({ open: false, text: '' });
    }

    const handleClickSubmit = () => {
        CustomerService.creditLimitIncrease(creditCardNumber, limit).then((response) => {
            if (response.data)
                setOpen({ open: true, text: 'your response has been recorded' })
        }, (error) => {

        })
    }
    const handleCreditCardChange = (e) => {
        setCreditCardNumber(e.target.value);
        for (let i = 0; i < creditCardList.length; i++) {
            if (e.target.value == creditCardList[i][0])
                setCurrentlimit(creditCardList[i][1]);
        }
    }
    useEffect(() => {
        CustomerService.getCustomerDetails().then((response) => {
            var creditCardList = response.data.creditCard.map((val) => [val.cardNumber, val.creditLimit]);
            setCreditCardList(creditCardList);
            // setCreditCardNumber(creditCardList[0][0]);
            // setCurrentlimit(creditCardList[0][1]);
        },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toStirng();
                console.log(_content);

            }

        );

    }, []);

    return (
        <>
            <div class="content">
                <section class="trasfer-beneficiary">
                    <h1 class="title">Credit Limit Increase</h1>
                    <div class="container">
                        <div class="transfer-form row">
                            <div class="form-field col-lg-6">
                                <FormControl fullWidth>
                                    <InputLabel id="creditCardNumber">Credit Card</InputLabel>
                                    <Select
                                        labelId="creditCardNumber"
                                        value={creditCardNumber}
                                        onChange={handleCreditCardChange}
                                    >
                                        {
                                            creditCardList.map(([cardNumber, limit]) => {
                                                return <MenuItem key={cardNumber} value={cardNumber}>{cardNumber}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div class="form-field col-lg-6">
                                <TextField

                                    id="standard-full-width"
                                    fullWidth
                                    label="current Limit"
                                    value={currentLimit}


                                />
                            </div>
                            <div class="form-field col-lg-6">
                                <TextField

                                    required
                                    fullWidth
                                    label="limit"

                                    onChange={(e) => { setLimit(e.target.value) }}

                                />
                            </div>
                            <div class="form-field col-lg-12">
                                <input class="submit-btn bg-success" onClick={handleClickSubmit} type="submit" value="submit" name="" />
                            </div>
                            <Snackbar open={open.open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">{open.text}</Alert>
                            </Snackbar>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
