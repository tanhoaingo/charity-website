import { GET_SUCCESS, GET_FAILURE } from '../constant/type';

const initialState = {
    data: [],
    err: ''
};

export default (post = initialState, action) => {
    switch(action.type){
        case GET_SUCCESS:
            return {data: action.payload, err: ''};
        case GET_FAILURE:
            return {data: {}, err: action.payload};
        default:
            return post;
    }
};