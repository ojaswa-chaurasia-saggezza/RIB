import React from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

export default function AddBiller() {

    return (
        <div id="wrapper">
            <div class="content">
                <section class="trasfer-beneficiary">
                    <h1 class="title">Add Biller</h1>
                    <div class="container">
                        <div class="transfer-form row">


                            <div class="form-field col-lg-6">
                                <label for="biller" class="label drop-label text-primary">Biller Name</label>
                                <select id="biller" class="form-select" aria-label="Default select example">
                                    <option disabled selected value> -- Select biller name -- </option>
                                </select>
                            </div>

                            <div class="form-field col-lg-6">
                                <input id="account" class="input-text" type="number" name="" />
                                <label for="account" class="label text-primary">Customer Account Number</label>
                            </div>

                            <div class="form-field col-lg-6">
                                <input id="amount" class="input-text" type="number" name="" />
                                <label for="amount" class="label text-primary">Billing Amount</label>
                            </div>

                            <div class="form-field col-lg-6">
                                <input id="description" class="input-text" type="textarea" name="" />
                                <label for="description" class="label text-primary">Description</label>
                            </div>

                            <div class="form-field col-lg-12">
                                <input class="submit-btn bg-success" type="submit" value="submit" name="" />
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </div>

    );
}
