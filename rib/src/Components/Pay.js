import React from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

export default function Pay() {

    return (
        <div class="content">
            <section class="trasfer-beneficiary">
                <h1 class="title">Pay Bill</h1>
                <div class="container">
                    <div class="transfer-form row">
                        
                        <div class="form-field col-lg-6">
                            <label for="from-account" class="label drop-label text-primary">From account</label>
                            <select id="from-account" class="form-select" aria-label="Default select example">
                                <option selected id="firstAccount">123456789034</option>
                                <option value="1">987654321033</option>
                                <option value="2">234567897654</option>
                                <option value="3">065996564596</option>
                            </select>
                        </div>

                        <div class="form-field col-lg-6">
                            <label for="description" class="label drop-label text-primary">Description</label>
                            <select id="description" class="form-select" aria-label="Default select example">
                                <option selected>Airtel bill payment</option>
                                <option value="1">Indane Gas bill payment</option>
                                <option value="2">Credit Card bill payment</option>
                                <option value="3">Electricity bill payment</option>
                            </select>
                        </div>

                        <div class="form-field col-lg-6">
                            <input id="amount" class="input-text" type="number" name="" />
                            <label for="amount" class="label text-primary">Amount</label>
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
