import axios from "axios";

const API_URL = "/api/auth/";

const signUp = (username, password) => {
    return axios.post(API_URL + "signUp", {
        username,
        password
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "login", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("customer", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("customer");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("customer"));
};

export default {
    signUp,
    login,
    logout,
    getCurrentUser,
};