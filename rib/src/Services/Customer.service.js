import axios from "axios";
import authHeader from "./Auth-header";
import otpHeader from "./Otp-header";

const API_URL = "/api/v1/";
const API_URL_OTP = "/";


const getPublicContent = () => {
  return axios.get(API_URL + "all");
}

const generateOTP = () => {
  return axios.get(API_URL_OTP + 'generateOtp', { headers: otpHeader() });
}

const validateOTP = (otpNumber) => {
  return axios.get(API_URL_OTP + 'validateOtp/' + otpNumber, { headers: otpHeader() });
}

const resetPassword = (username, password) => {
  return axios.post(API_URL + 'resetPassword', { username, password }, { headers: otpHeader() });
}


const getCustomerDetails = () => {
  return axios.get(API_URL + "CustomerDetails", { headers: authHeader() });
}

const getAccountDetails = (accountNumber) => {
  return axios.get(API_URL + "Account/" + accountNumber, { headers: authHeader() });
}

const getCreditCardDetails = (creditCardNumber) => {
  return axios.get(API_URL + "CreditCard/" + creditCardNumber, { headers: authHeader() });
}

const getCreditCardPFAData = (creditCardNumber, startDate, endDate) => {
  startDate = startDate.toISOString();
  endDate = endDate.toISOString();
  return axios.post(API_URL + 'CreditCard/' + creditCardNumber + '/PFA', { startDate, endDate }, { headers: authHeader() });
}

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
}

const addBenefeciary = (accountNumber, nickName, ifsc) => {
  return axios.post(API_URL + "AddBeneficiary/", { accountNumber, nickName, ifsc }, { headers: authHeader() });
}

const getAccounts = () => {
  return axios.get(API_URL + "GetAccounts/", { headers: authHeader() });
}
const editBeneficiary = (accountNumber, nickName, ifsc) => {
  return axios.put(API_URL + "EditBeneficiary/", { accountNumber, nickName, ifsc }, { headers: authHeader() });
}
const deleteBeneficiary = (nickName) => {
  return axios.delete(API_URL + "DeleteBeneficiary/", {data : { nickName } , headers : authHeader()});// { accountNumber, nickName, ifsc }, { headers: authHeader() });
}
const getAllBeneficiaries = () => {
  return axios.get(API_URL + "GetAllBeneficiaries/", { headers: authHeader() });
}

const fundTransferWithinBankBeneficiary = (fromAccount, beneficiary, transferMode, amount) => {
  return axios.post(API_URL + "FTWithinBankBeneficiary/", { fromAccount, beneficiary, transferMode, amount }, { headers: authHeader() })
}

const fundTransferWithinBankAccount = (fromAccountNumber, toAccountNumber, amount) => {
  return axios.post(API_URL + "TransferWithinBankAccounts/", {fromAccountNumber, toAccountNumber, amount}, {headers: authHeader()});
}

const getAllGlobalBillers = () => {
  return axios.get(API_URL + "GetGlobalBillers/", { headers: authHeader() });
}

const addBiller = (billerName, billerAccountNumber, description) => {
  return axios.post(API_URL + "AddBiller/", { billerName, billerAccountNumber, description }, { headers: authHeader() });
}

const getAllBillers = () => {
  return axios.get(API_URL + "GetAllBillers/", { headers: authHeader() });
}

const editBiller = (billerName, billerAccountNumber, description) => {
  return axios.post(API_URL + "EditBiller/", { billerName, billerAccountNumber, description }, { headers: authHeader() });
}

const deleteBiller = (description) => {
  return axios.delete(API_URL + "DeleteBiller/", { data : {description}, headers: authHeader() });
}

const pay = (fromAccount, description, amount) => {
  return axios.post(API_URL + "Pay/", { fromAccount, description, amount }, { headers: authHeader() });
}

const requestCASA = (type,fromAccount)=>{
  return axios.post(API_URL+"productOpening/CASA" , {type,fromAccount} , {headers : authHeader()});
}


export default {
  getPublicContent,
  getCustomerDetails,
  getAccountDetails,
  generateOTP,
  getCreditCardDetails,
  validateOTP,
  getCreditCardPFAData,
  resetPassword,
  getAdminBoard,
  addBenefeciary,
  getAccounts,
  editBeneficiary,
  deleteBeneficiary,
  getAllBeneficiaries,
  addBenefeciary,
  fundTransferWithinBankBeneficiary,
  fundTransferWithinBankAccount,
  getAllGlobalBillers,
  addBiller,
  getAllBillers,
  editBiller,
  deleteBiller,
  pay,
  deleteBeneficiary,
  requestCASA,
};