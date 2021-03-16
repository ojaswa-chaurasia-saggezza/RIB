import React from 'react';
import '../CSS/style.css';
import '../CSS/style1.css';
import '../CSS/ErrorStyling.css';

export default function CardType() {
    return (
        <div class="content" >
            <section class="add-beneficiary">
                <h1 class="title bg-primary" >Open New Credit Card</h1>
                <br/><br/><br/>
                <div class="container">
                    <div class="contact-form row">

                        <div class="form-field col-lg-6">
                            <label for="productType" class="label drop-label text-primary">Card Product type</label>
                            <select id="productType" class="form-select" aria-label="Default select example">
                                <option disabled selected value> -- Select card product type -- </option>
                                <option >General</option>
                                <option value="1">Travel</option>
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