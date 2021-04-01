import React, { Suspense, useEffect, useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

import MetaDataService from "../Services/MetaData.sevice";
import PlainDialog from "../Elements/PlainDialog";

export default function FTWithinBankAccount() {
    const [termsAndConditions, setTermsAndConditions] = useState("Empty");
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        MetaDataService.getTermsAndConditions().then((response) => {
            if (response.data)
                setTermsAndConditions(response.data);
            console.log(response.data);

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
                                <label for="from-account" class="label drop-label text-primary">From account</label>
                                <select id="from-account" class="form-select" aria-label="Default select example">
                                    <option selected>123456789034</option>
                                    <option value="1">987654321033</option>
                                    <option value="2">234567897654</option>
                                    <option value="3">065996564596</option>
                                </select>
                            </div>

                            <div class="form-field col-lg-6">
                                <label for="to-account" class="label drop-label text-primary">To account</label>
                                <select id="to-account" class="form-select" aria-label="Default select example">
                                    <option selected>123456789034</option>
                                    <option value="1">987654321033</option>
                                    <option value="2">234567897654</option>
                                    <option value="3">065996564596</option>
                                </select>
                            </div>

                            <div class="form-field col-lg-6">
                                <input id="amount" class="input-text" type="number" name="" />
                                <label for="amount" class="label text-primary">Amount</label>
                            </div>

                            <div role="button" className="col-lg-12 text-danger text-start " onClick={()=>{setOpen(true)}}>*Terms & Conditions</div>


                            <div class="form-field col-lg-12">
                                <input class="submit-btn bg-success" type="submit" value="submit" name="" />
                            </div>

                        </div>
                    </div>
                </section>
            </div>


            <PlainDialog data={termsAndConditions} open={open} handleClose={handleClose} title="Terms and Contitions"/>
        </React.Fragment>
    );
}
