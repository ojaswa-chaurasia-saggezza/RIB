export default function otpHeader() {
    const signUpCredentials = JSON.parse(localStorage.getItem('SignUpToken'));

    if (signUpCredentials && signUpCredentials.accessToken) {
        console.log(signUpCredentials.accessToken);
        return { Authorization: 'Bearer ' + signUpCredentials.accessToken };
    } else {
        return {};
    }
}