import React, { useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';
import CustomerService from '../Services/Customer.service';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function CardType() {
    const [creditCardType, setCreditCardType] = useState("General");
    const [open, setOpen] = React.useState({ open: false, text: '' });

    const types = ['General', 'Travel'];

    const handleClose = () => {
        setOpen({open:false,text: ''});
      }
   const handleSubmit = () =>
    {
        CustomerService.requestCreditCard(creditCardType).then(
            (response) => {
                if (response.data)
                    setOpen({open:true,text: 'Your request has been recorded'})
            },
            (error) => { 
                const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
                setOpen({open:true,text: _content});
            
            }
        )
    }
    return (
        <React.Fragment>
            <div class="content" >
                <section class="trasfer-beneficiary">
                    <h1 class="title bg-primary" >Open New Credit Card</h1>
                    <br />
                    <div class="container">
                        <div class="transfer-form row">

                            <div class="form-field col-lg-12">
                                <FormControl fullWidth>
                                    <InputLabel id="product-type">Card Product Type</InputLabel>
                                    <Select
                                        labelId="product-type"
                                        value={creditCardType}
                                        onChange={e=>{setCreditCardType(e.target.value)}}
                                    >
                                        {
                                            types.map((value)=>{
                                                return <MenuItem value={value} key={value}>{value}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div class="form-field col-lg-12">
                                <input class="submit-btn bg-success" onClick={handleSubmit} type="submit" value="submit" name="" />
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