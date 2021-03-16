import React from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

export default function ChequeRequest() {

    return (
        <div class="content">
            <section class="trasfer-beneficiary">
                <h1 class="title">Create New Cheque Request</h1>
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
                            <label for="leaf" class="label drop-label text-primary">Leaf</label>
                            <select id="leaf" class="form-select" aria-label="Default select example">
                                <option selected>10</option>
                                <option value="1">25</option>
                                <option value="2">50</option>
                                <option value="3">100</option>
                            </select>
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
