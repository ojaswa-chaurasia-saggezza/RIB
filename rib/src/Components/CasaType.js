import React from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

export default function CasaType()
{
    return (
<div class="content" >
      <section class="trasfer-beneficiary">
        <h1 class="title bg-primary" >Open New CASA Account</h1>
        <br/><br/><br/>
        <div class="container">
          <div class="trasfer-form row">

            <div class="form-field col-lg-6">
              <label for="account-type" class="label drop-label text-primary">Account type</label>
              <select id="account-type" class="form-select" aria-label="Default select example">
                 <option selected>Savings</option>
                <option value="1">Checking</option>
              </select>
            </div>
            <div class="form-field col-lg-6">
              <label for="account" class="label drop-label text-primary">From Account Number</label>
              <select id="account" class="form-select" aria-label="Default select example">
                 <option selected>234576287354</option>
                <option value="1">887634245121</option>
              </select>
            </div>
            <div class="form-field col-lg-12">
              <input class="submit-btn bg-success" type="submit" value="submit" name=""/>
            </div>

          </div>
        </div>
      </section>
    </div>

    );
}
