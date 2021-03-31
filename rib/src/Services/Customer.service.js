import axios from "axios";
import authHeader from "./Auth-header";
import otpHeader from "./Otp-header";

const API_URL = "http://localhost:8080/api/v1/";
const API_URL_OTP = "http://localhost:8080/";


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
  return axios.post(API_URL + "AddBeneficiary/", {accountNumber, nickName, ifsc}, { headers: authHeader() });
}

const getAccounts = () => {
  return axios.get(API_URL + "GetAccounts/", { headers: authHeader() });
}
const editBeneficiary = (accountNumber,nickName,ifsc) => {
  return axios.put(API_URL + "EditBeneficiary/", {accountNumber,nickName,ifsc}, {headers: authHeader() });
}
const getAllBeneficiaries = () =>
{
  return axios.get(API_URL + "GetAllBeneficiaries/" , {headers:authHeader()});
}

const fundTransferWithinBankBeneficiary = (fromAccount, beneficiary, transferMode, amount) => {
  return axios.post(API_URL + "FTWithinBankBeneficiary/", {fromAccount, beneficiary, transferMode, amount}, {headers: authHeader() })
}

const getAllGlobalBillers = () => {
  return axios.get(API_URL + "GetGlobalBillers/", {headers: authHeader() });
}

const addBiller = (billerName, billerAccountNumber, description) => {
  return axios.post(API_URL + "AddBiller/", {billerName, billerAccountNumber, description}, {headers: authHeader() });
}

const getAllBillers = () => {
  return axios.get(API_URL + "GetAllBillers/", {headers: authHeader() });
} 

const editBiller = (billerName, billerAccountNumber, description) => {
  return axios.post(API_URL + "EditBiller/", {billerName, billerAccountNumber, description}, {headers: authHeader() });
}

const pay = (fromAccount, description, amount) => {
  return axios.post(API_URL + "Pay/", {fromAccount, description, amount}, {headers: authHeader() });
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
  getAllBeneficiaries,
  addBenefeciary,
  fundTransferWithinBankBeneficiary,
  getAllGlobalBillers,
  addBiller,
  getAllBillers,
  editBiller,
  pay
};