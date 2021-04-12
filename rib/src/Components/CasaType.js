import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

import CustomerService from "../Services/Customer.service";

export default function CasaType() {

  const [accountType, setAccountType] = useState("Savings");
  const [fromAccount, setFromAccount] = useState("");
  const [Accounts, setAccounts] = useState([]);


  const handleClickSubmit = () => {
    CustomerService.requestCASA(accountType, fromAccount).then((response) => { 
      if(response.data)
        console.log(response.data);

    },(error) => {

      });

  }

  useEffect(() => {
    CustomerService.getCustomerDetails().then(
      (response) => {
        var accountList = response.data.accounts.map((val) => val.accountNumber);
        setAccounts(accountList);
        setFromAccount(accountList[0]);

      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        console.log(_content);
      }
    );

  }, []);

  return (
    <div class="content" >
      <section class="trasfer-beneficiary">
        <h1 class="title bg-primary" >Open New CASA Account</h1>
        <br /><br /><br />
        <div class="container">
        <div class="transfer-form row">

            <div class="form-field col-lg-6">
              <label for="account-type" class="label drop-label text-primary">Account type</label>
              <select onChange={(e) => { setAccountType(e.target.value) }} id="account-type" class="form-select" aria-label="Default select example">
                <option selected value="Saving">Savings</option>
                <option value="Checking">Checking</option>
              </select>
            </div>
            <div class="form-field col-lg-6">
              <label for="account" class="label drop-label text-primary">From Account Number</label>
              <select value={fromAccount} onChange={(e) => { setFromAccount(e.target.value) }} id="accountjfdlksjf" class="form-select" aria-label="Default select example">
                {Accounts.map((val) => <option key={val} value={val}>{val}</option>)}
              </select>
            </div>
            <div class="form-field col-lg-12">
              <input class="submit-btn bg-success" onClick={handleClickSubmit} type="submit" value="submit" name="" />
            </div>

          </div>
        </div>
      </section>
    </div>

  );
}
