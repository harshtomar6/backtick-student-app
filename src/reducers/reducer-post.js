import * as actionTypes from './../actions/actions-type';

const initialState = {
    isLoading: false,
    hasError: false,
    errMsg: '',
    data: [],
}

export function posts(state = initialState, action){
    switch(action.type){
        case actionTypes.GET_POST_REQUEST:
            return {...state, isLoading: true}
        case actionTypes.GET_POST_SUCCESS:
            return {...state, data: action.payload, isLoading: false}
        case actionTypes.GET_POST_ERROR:
            return {...state, hasError: true, errMsg: action.payload, isLoading: false}
        default:
            return state;
    }
}