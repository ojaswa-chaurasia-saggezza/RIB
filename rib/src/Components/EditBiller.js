import React from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

export default function EditBiller() {

    return (
        <div class="content">
            <section class="trasfer-beneficiary">
                <h1 class="title">Edit Biller</h1>
                <div class="container">
                    <div class="transfer-form row">
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
                            <input id="name" class="input-text" type="text" name="" />
                            <label for="name" class="label text-primary">Biller Name</label>
                        </div>

                        <div class="form-field col-lg-6">
                            <input id="account" class="input-text" type="number" name="" />
                            <label for="account" class="label text-primary">Customer Account Number</label>
                        </div>

                        <div class="row justify-content-center">
                            <div class="form-field col-lg-4">
                                <input class="submit-btn bg-success" type="submit" value="submit" name="" />
                            </div>
                            <div class="form-field col-lg-4">
                                <input class="submit-btn bg-danger" type="submit" value="delete" data-bs-toggle="modal"
                                    data-bs-target="#deleteModal" name="" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>

    );
}
