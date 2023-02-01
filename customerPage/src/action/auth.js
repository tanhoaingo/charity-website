import {AUTH_SUCCESS, AUTH_FAILURE} from '../constant/type';
import * as api from '../api/auth';

export const login = (LoginRequest) => async (dispatch) => {
    const { status, data } = await api.login(LoginRequest);

    if(status === 200){
        localStorage.setItem('USERNAME', data.username);
        localStorage.setItem('TOKEN', data.authenticationToken);
        localStorage.setItem('REFRESH_TOKEN', data.refreshToken);
        dispatch({type: AUTH_SUCCESS, payload: data});
        window.location.href = "http://localhost:3001";
    } else {
        dispatch({type: AUTH_FAILURE, payload: "Đăng nhập không thành công vui lòng thử lại!"});
    }
}

export const signup = (RegisterRequest) => async (dispatch) => {
    try {
        const {data} = await api.signup(RegisterRequest);

        dispatch({type: AUTH_SUCCESS, payload: data});
        alert(data);
        window.location.href = "http://localhost:3001/login";
    } catch (error) {
        dispatch({ type: AUTH_FAILURE, payload: error})
    }
}