import React from 'react';
import '../CSS/style.css';


export default function Editbeneficiary()
{
    return(
<div class="content">
      <section class="trasfer-beneficiary">
        <h1 class="title">Edit Beneficiary</h1>
        <div class="container">
          <div class="transfer-form row">

            <div class="form-field col-lg-6">
              <label for="beneficiary" class="label drop-label text-primary">Beneficiary</label>
              <select id="beneficiary" class="form-select" aria-label="Default select example">
                <option selected>Thiru</option>
                <option value="1">Shanti</option>
                <option value="2">Nayan</option>
                <option value="3">Ojaswa</option>
              </select>
             </div>

                            <div class="form-field col-lg-6">
                            <input id="account" class="input-text" type="number" name=""/>
                            <label for="account" class="label text-primary">Account Number</label>
                            </div>

                            <div class="form-field col-lg-6">
                            <input id="name" class="input-text" type="text" name="" value="Thiru" readonly/>
                            <label for="name" class="label text-primary">Name</label>
                            </div>

                            <div class="form-field col-lg-6">
                            <input id="ifsc" class="input-text" type="number" name=""/>
                            <label for="ifsc" class="label text-primary">IFSC</label>
                            </div>

                            <div class="row justify-content-center">
                            <div class="form-field col-lg-4">
                                <input class="submit-btn bg-success" type="submit" value="submit" name=""/>
                            </div>

                            <div class="form-field col-lg-4">
                                <input class="submit-btn bg-danger" type="submit" value="Delete" data-bs-toggle="modal"
                                data-bs-target="#deleteModal" name=""/>
                            </div>
              
            </div>


          </div>
        </div>
      </section>
    </div>
    );
}