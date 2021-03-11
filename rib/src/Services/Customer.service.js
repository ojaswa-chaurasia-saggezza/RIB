import axios from "axios";
import authHeader from "./Auth-header";

const API_URL = "http://localhost:8080/api/v1/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getCustomerDetails = (username) => {
  return axios.get(API_URL + "Customer/" + username, { headers: authHeader() });
};


const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getCustomerDetails,
  getAdminBoard,
};