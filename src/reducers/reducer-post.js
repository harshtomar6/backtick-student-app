import * as actionTypes from './../actions/actions-type';

const initialState = {
    isLoading: false,
    hasError: false,
    errMsg: '',
    fetchingAgain: false,
    reFetchError: '',
    data: [],
}

export function posts(state = initialState, action){
    switch(action.type){
        case actionTypes.GET_POST_REQUEST:
            return {...state, isLoading: true}
        case actionTypes.RE_GET_POST_REQUEST:
            return {...state, fetchingAgain: true}
        case actionTypes.GET_POST_SUCCESS:
            return {...state, data: action.payload, isLoading: false}
        case actionTypes.RE_GET_POST_SUCCESS:
            return {...state, data: [...state.data, ...action.payload], fetchingAgain: false}
        case actionTypes.RE_GET_POST_ERROR:
            return {...state, reFetchError: true, errMsg: action.payload, fetchingAgain: false}
        case actionTypes.GET_POST_ERROR:
            return {...state, hasError: true, errMsg: action.payload, isLoading: false}
        default:
            return state;
    }
}