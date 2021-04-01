import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import CustomerService from '../Services/Customer.service';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Editbeneficiary() {
  const [open, setOpen] = React.useState(false);

  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberError, setAccountNumberError] = useState({ error: false, errorText: "" });;
  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState({ error: false, errorText: "" });;
  const [ifsc, setIfsc] = useState("");
  const [allBeneficiaries, setAllBeneficiaries] = useState({});
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(0);
  const [ifscError, setIfscError] = useState({ error: false, errorText: "" });;
  const [deleteBeneficiary, setDeleteBeneficiay] = useState();





  useEffect(() => {
    CustomerService.getAllBeneficiaries().then((response) => {
      if (response.data  && response.data.length>0) {
        setAllBeneficiaries(response.data);
        setNickName(response.data[0].nickName)
        setAccountNumber(response.data[0].account.accountNumber)
        setIfsc(response.data[0].account.ifsc);
      }
      else
      {
        setAllBeneficiaries({});
        setNickName("");
        setAccountNumber("")
        setIfsc("");
      }
      console.log("yeh response data hai " + response.data);
    }, (error) => {
      const _content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      setAllBeneficiaries({});
      console.log(_content);

    });

  }, [open, setOpen]);



  const handleClick = () => {
    setOpen(true);
  }
  const handleEditbeneficiary = () => {

    console.log("ho ra h");
    console.log(accountNumber + "   " + nickName + "    " + ifsc);
    if (accountNumber == '')
      setAccountNumberError("Enter Valid account number");

    if (nickName == '')
      setNickNameError("Nickname must be unique");

    if (ifsc == '')
      setIfscError("Entered Otp is not correct");

    if (accountNumber != "" && nickName != "" && ifsc != "") {
      console.log(accountNumber + "   " + nickName + "    " + ifsc);
      CustomerService.editBeneficiary(accountNumber, nickName, ifsc).then((response) => {
        handleClick();
      });
    }

  }

  const handleDeleteBeneficiary = () => {
    CustomerService.deleteBeneficiary(nickName).then((response) => {
      handleClick();
    });
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <React.Fragment>
      <div class="content">
        <section class="trasfer-beneficiary">
          <h1 class="title">Edit Beneficiary</h1>
          <div class="container">
            <div class="transfer-form row">
              <div class="form-field col-lg-6">
                <FormControl fullWidth>
                  <InputLabel id="beneficiary">Beneficiary</InputLabel>
                  <Select
                    labelId="beneficiary"
                    value={selectedBeneficiary}
                    onChange={e => { setSelectedBeneficiary(e.target.value); setAccountNumber(allBeneficiaries[e.target.value].account.accountNumber);setNickName(allBeneficiaries[e.target.value].nickName); setIfsc(allBeneficiaries[e.target.value].account.ifsc)}}
                  >
                    {
                      Object.entries(allBeneficiaries).map(([key, value]) => {
                        return <MenuItem value={key}>{value.nickName}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </div>

              <div class="form-field col-lg-6">
                <TextField
                  id="account"
                  required
                  fullWidth
                  label="Account Number"
                  value={accountNumber}
                  onChange={(e) => { setAccountNumber(e.target.value) }}
                  onKeyPress={() => { if (accountNumber != "") setAccountNumberError({ error: false, errorText: "" }) }}
                  error={accountNumberError.error}
                  helperText={accountNumberError.errorText} />
              </div>

              <div class="form-field col-lg-6">
                <TextField
                  id="ifsc"
                  required
                  fullWidth
                  label="IFSC"
                  value={ifsc}
                  onChange={e => setIfsc(e.target.value)}
                  onKeyPress={() => { if (ifsc != "") setIfscError({ error: false, errorText: "" }) }}
                  error={ifscError.error}
                  helperText={ifscError.errorText} />
              </div>


              {/* { console.log("ye hai :" + allBeneficiaries[selectedBeneficiary].accountNumber)} */}
              {/* {Object.entries(allBeneficiaries).map(([key,value])=>{
             console.log(key+"          "+value.account.accountNumber);
           })}
           {console.log(allBeneficiaries[selectedBeneficiary]?.account?.accountNumber)}

           {console.log("account number:    " + accountNumber)}

           {console.log("beneficiary   "+ selectedBeneficiary)} */}

              {/* <div class="form-field col-lg-6">
              <input id="name" class="input-text" type="text" name="" value={nickName} onChange={e => setNickName(e.target.value)} />
              <label for="name" class="label text-primary">Name</label>
            </div> */}

              <div class="row justify-content-center">
                <div class="form-field col-lg-4">
                  <input class="submit-btn bg-success" type="submit" value="submit" name="" onClick={handleEditbeneficiary} />
                </div>

                <div class="form-field col-lg-4">
                  <input class="submit-btn bg-danger" type="submit" value="Delete" data-bs-toggle="modal"
                    data-bs-target="#deleteModal" name="" onClick={handleDeleteBeneficiary} />
                </div>

              </div>


            </div>
          </div>
        </section>


      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Beneficiary edit Successfully!
              </Alert>
      </Snackbar>
    </React.Fragment>

  );
}