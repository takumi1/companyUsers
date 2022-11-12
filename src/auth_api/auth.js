import axios from 'axios';

const API_URL = 'https://reqres.in/api/';

export const register = (email, password) => axios.post(`https://reqres.in/api/register`, {
    'email': email,
    'password': password,
}).then((response) => {
    localStorage.setItem('authToken', response.data.token);
    return response.data;
})
.catch((e) => {
    return e;
});



const login = (email, password) => axios
    .post(`${API_URL}auth/login`, {
        email,
        password,
    })
    .then((response) => {
        console.log(response);
        if (response.data.token) {
            localStorage.setItem('tokens', JSON.stringify(response.data));
        }
        return response.data;
    });


export default register;