import React from 'react';
import '../CSS/style.css';
import '../CSS/style1.css';
import '../CSS/ErrorStyling.css';

export default function CreditLimitIncrease() {

    return (
        <div class="content">
            <section class="trasfer-beneficiary">
                <h1 class="title">Credit Limit Increase</h1>
                <div class="container">
                    <div class="transfer-form row">
                        <div class="form-field col-lg-6">
                            <label for="CreditCardNumber" class="label drop-label text-primary">Credit Card Number</label>
                            <select id="CreditCardNumber" class="form-select" aria-label="Default select example">
                                <option selected>234576287354</option>
                                <option value="1">887634245121</option>
                            </select>
                        </div>
                        <div class="form-field col-lg-6">
                            <input id="CurrentLimit" class="input-text" type="text" />
                            <label for="CurrentLimit" class="label text-primary">Current Limit</label>
                        </div>
                        <div class="form-field col-lg-6">
                            <input id="NewCreditLimit" class="input-text" type="number" name="" />
                            <label for="NewCreditLimit" class="label text-primary">New Credit Limit</label>
                        </div>
                        <div class="form-field col-lg-12">
                            <input class="submit-btn bg-success" type="submit" value="submit" name="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
