import * as api from '../api/post';
import { GET_FAILURE, GET_SUCCESS } from '../constant/type';

export const getAll = () => async (dispatch) => {
    try {
        const { data } = await api.getAll();
        dispatch({type: GET_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: GET_FAILURE, payload: error});
    }
}

export const getEntire = () => async (dispatch) => {
    try {
        const { data } = await api.getEntire();
        let rows = [];
        data.map(post => {
          rows.push({
            id: post.id,
            image: 'data:image/jpeg;base64,' + post.image,
            title: post.title,
            progress: ((post.contribution / post.expectation) * 100).toFixed(0) + "%",
            organization: post.organization,
            type: post.type,
            remainingDay: post.remainingDay,
          })
        });
        dispatch({type: GET_SUCCESS, payload: rows});
    } catch (error) {
        dispatch({type: GET_FAILURE, payload: error});
    }
}