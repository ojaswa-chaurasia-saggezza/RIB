import React, { useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';
import CustomerService from '../Services/Customer.service';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function CardType() {
    const [creditCardType, setCreditCardType] = useState("General");
    const [open, setOpen] = React.useState({ open: false, text: '' });

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
        <>
            <div class="content" >
                <section class="trasfer-beneficiary">
                    <h1 class="title bg-primary" >Open New Credit Card</h1>
                    <br />
                    <div class="container">
                        <div class="transfer-form row">

                            <div class="form-field col-lg-6">
                                <label for="productType" class="label drop-label text-primary">Card Product type</label>
                                <select onChange={(e) => {
                                    setCreditCardType(e.target.value);
                                }} id="productType" class="form-select" aria-label="Default select example" value={creditCardType}>
                                    <option value={"General"}>General</option>
                                    <option value={"Travel"}>Travel</option>
                                </select>
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
            
        </>
    );
}