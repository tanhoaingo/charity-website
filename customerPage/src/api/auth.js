import axios from 'axios';

const URL = 'http://localhost:8080/auth';

export const login = (LoginRequest) => axios.post(`${URL}/login`, LoginRequest);
export const signup = (RegisterRequest) => axios.post(`${URL}/signup`, RegisterRequest);
export const refresh = (RefreshRequest) => axios({method: 'POST', url: `${URL}/refresh/token`,headers:{'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')}, data: RefreshRequest});
export const isLoggedIn = () => axios.get(`${URL}/user`);