import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

import CustomerService from '../Services/Customer.service'

export default function FTWithinBankBeneficiary() {

  const [accounts, setAccounts] = useState([]);


  useEffect(() => {
    const accountsList = CustomerService.getAccounts().then((response) => {
      setAccounts(response.data);

    },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      });
  }, []);

  return (
    <div class="content">
      <section class="trasfer-beneficiary">
        <h1 class="title">Transfer within bank Beneficiary</h1>
        <div class="container">
          <div class="transfer-form row">

            <div class="form-field col-lg-6">
              <label for="from-account" class="label drop-label text-primary">From account</label>
              <select id="from-account" class="form-select" aria-label="Default select example">
                {
                  Object.entries(accounts).map(([key, value]) => {
                    return <option key={key}>{value.accountNumber} </option>
                  })
                }
              </select>
            </div>

            <div class="form-field col-lg-6">
              <label for="transfer-mode" class="label drop-label text-primary">Transfer mode</label>
              <select id="transfer-mode" class="form-select" aria-label="Default select example">
                <option selected>NEFT</option>
                <option value="1">RTGS</option>
                <option value="2">IMPS</option>
              </select>
            </div>

            <div class="form-field col-lg-6">
              <label for="beneficiary" class="label drop-label text-primary">Beneficiary</label>
              <select id="beneficiary" class="form-select" aria-label="Default select example">
                <option selected>Nayan</option>
                <option value="1">Shanti</option>
                <option value="2">Ojaswa</option>
                <option value="3">Thiru</option>
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
