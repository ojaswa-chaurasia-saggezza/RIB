import axios from "axios";

const generateTempPassword = (username) => {
    return axios.post('generateTempPassword/', {username});
}

const resetTempPassword = (username, tempPassword, newPassword) => {
    return axios.post('resetTempPassword', {username, tempPassword, newPassword});
}

const forgotUsername = (email) => {
    return axios.post('forgotUsername', {email});
}

export default {
    generateTempPassword,
    resetTempPassword,
    forgotUsername
}