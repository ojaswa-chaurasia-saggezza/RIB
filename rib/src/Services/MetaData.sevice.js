import axios from 'axios';

const API_URL = "http://localhost:8080/api/MetaData/";

const getTermsAndConditions = () => {
    return axios.get(API_URL + "TermsAndConditions");
}


export default {
    getTermsAndConditions,
}
