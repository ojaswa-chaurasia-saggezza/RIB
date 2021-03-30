import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import CustomerService from '../Services/Customer.service';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Editbeneficiary() {
  const [open, setOpen] = React.useState(false);

  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");
  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [ifscError, setIfscError] = useState("");

  const [allBeneficiaries, setAllBeneficiaries] = useState({});
  useEffect(() => {
    CustomerService.getAllBeneficiaries().then((response) => {
      if (response.data)
        setAllBeneficiaries(response.data);
      console.log(response.data);
    }, (error) => {
      const _content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      setAllBeneficiaries({});
      console.log(_content);

    });

  }, []);



  const handleClick = () => {
    setOpen(true);
  }
  const handleEditbeneficiary = () => {
    if (accountNumber == '')
      setAccountNumberError("Enter Valid account number");

    if (nickName == '')
      setNickNameError("Nickname must be unique");

    if (ifsc == '')
      setIfscError("Entered Otp is not correct");

    if (accountNumber != "" && nickName != "" && ifsc != "") {
      CustomerService.editBeneficiary(accountNumber, nickName, ifsc).then(() => {
        handleClick();
      });
    }

  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div class="content">
      <section class="trasfer-beneficiary">
        <h1 class="title">Edit Beneficiary</h1>
        <div class="container">
          <div class="transfer-form row">

            <div class="form-field col-lg-6">
              <label for="beneficiary" class="label drop-label text-primary">Beneficiary</label>
              <select id="beneficiary" class="form-select" aria-label="Default select example">
                {
                  Object.entries(allBeneficiaries).map(([key,value])=>{
                    return <option key={key}>{value.nickName}</option>
                  })
                }
              </select>
            </div>

            <div class="form-field col-lg-6">
              <input id="account" class="input-text" type="number" name="" onChange={e => setAccountNumber(e.target.value)} />
              <label for="account" class="label text-primary">Account Number</label>
            </div>

            <div class="form-field col-lg-6">
              <input id="name" class="input-text" type="text" name="" onChange={e => setNickName(e.target.value)} />
              <label for="name" class="label text-primary">Name</label>
            </div>

            <div class="form-field col-lg-6">
              <input id="ifsc" class="input-text" type="text" name="" onChange={e => setIfsc(e.target.value)} />
              <label for="ifsc" class="label text-primary">IFSC</label>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Beneficiary added Successfully!
                        </Alert>
            </Snackbar>
            <div class="row justify-content-center">
              <div class="form-field col-lg-4">
                <input class="submit-btn bg-success" type="submit" value="submit" name="" onClick={handleEditbeneficiary} />
              </div>

              <div class="form-field col-lg-4">
                <input class="submit-btn bg-danger" type="submit" value="Delete" data-bs-toggle="modal"
                  data-bs-target="#deleteModal" name="" />
              </div>

            </div>


          </div>
        </div>
      </section>
    </div>
  );
}