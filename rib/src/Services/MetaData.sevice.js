import axios from 'axios';

const API_URL = "/api/MetaData/";

const getTermsAndConditions = () => {
    return axios.get(API_URL + "TermsAndConditions");
}


export default {
    getTermsAndConditions,
}
