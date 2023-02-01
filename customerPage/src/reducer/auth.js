import { AUTH_SUCCESS, AUTH_FAILURE } from '../constant/type';

const initialState = {
    user: {},
    err: ''
};

export default (auth = initialState, action) => {
    switch(action.type){
        case AUTH_SUCCESS:
            return {user: action.payload, err: ''};
        case AUTH_FAILURE:
            return {user: {}, err: action.payload}
        default:
            return auth;
    }
};