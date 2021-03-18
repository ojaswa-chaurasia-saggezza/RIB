import React from 'react';
import '../CSS/style.css';

export default function AddBeneficiary() {
  return (
    <div class="content">
      <section class="trasfer-beneficiary">
        <h1 class="title bg-primary">Add beneficiary</h1>
        <div class="container">
          <div class="transfer-form row">
            <div class="form-field col-lg-6">
              <input id="account" class="input-text" type="text" />
              <label for="account" class="label text-primary">Account Number</label>
            </div>
            <div class="form-field col-lg-6">
              <input id="name" class="input-text" type="text" name="" />
              <label for="name" class="label text-primary">Name</label>
            </div>
            <div class="form-field col-lg-6">
              <input id="ifsc" class="input-text" type="text" name="" />
              <label for="ifsc" class="label text-primary">IFSC CODE</label>
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
