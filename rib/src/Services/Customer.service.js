import axios from "axios";
import authHeader from "./Auth-header";
import otpHeader from "./Otp-header";

const API_URL = "http://localhost:8080/api/v1/";
const API_URL_OTP = "http://localhost:8080/";


const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const generateOTP = () => {
  return axios.get(API_URL_OTP + 'generateOtp', { headers: otpHeader() });
}

const validateOTP = (otpNumber) => {
  return axios.get(API_URL_OTP + 'validateOtp/' + otpNumber, { headers: otpHeader() });
}


const getCustomerDetails = () => {
  return axios.get(API_URL + "CustomerDetails", { headers: authHeader() });
};

const getAccountDetails = (accountNumber) => {
  return axios.get(API_URL + "Account/" + accountNumber, { headers: authHeader() });
}


const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getCustomerDetails,
  getAccountDetails,
  generateOTP,
  validateOTP,
  getAdminBoard,
};