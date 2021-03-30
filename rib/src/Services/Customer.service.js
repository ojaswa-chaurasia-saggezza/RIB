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
  addBenefeciary
};