import * as actionTypes from './../actions/actions-type';
import _ from 'lodash';

const initialState = {
	isLoading: false,
	hasError: false,
	errMsg: '',
	fetchingAgain: false,
	reFetchError: '',
	data: {},
	lastFetch: false
}

export function posts(state = initialState, action) {
	let newState;
	switch (action.type) {
		case actionTypes.GET_POST_REQUEST:
			return { ...state, isLoading: true, lastFetch: false }
		case actionTypes.RE_GET_POST_REQUEST:
			return { ...state, fetchingAgain: true }
		case actionTypes.GET_POST_SUCCESS:
			return { ...state, data: _.mapKeys(action.payload, '_id'), isLoading: false }
		case actionTypes.RE_GET_POST_SUCCESS:
			if (action.payload.length === 0)
				newState = { ...state, lastFetch: true }
			else
				newState = {
					...state, data: { ...state.data, ..._.mapKeys(action.payload, '_id') },
					fetchingAgain: false
				}
			return newState;
		case actionTypes.RE_GET_POST_ERROR:
			return { ...state, reFetchError: true, errMsg: action.payload, fetchingAgain: false }
		case actionTypes.GET_POST_ERROR:
			return { ...state, hasError: true, errMsg: action.payload, isLoading: false }
		case actionTypes.UPDATE_LIKES_POST:
			let post = state.data[action.payload.postId];
			if (post.likes.includes(action.payload.userId))
				post.likes.splice(post.likes.indexOf(action.payload.userId), 1);
			else
				post.likes.push(action.payload.userId);
			let newPost = {};
			newPost[action.payload.postId] = { ...post }
			return { ...state, data: { ...state.data, ...newPost } };
		default:
			return state;
	}
}

const createPostInitalState = {
    status:'BUILDING',
    error:null,
    post:null
}

export function createPost(state=createPostInitalState,action){
    switch(action.type){
        case actionTypes.CREATE_POST_BUILD:
            return {status:'BUILDING'}
        case actionTypes.CREATE_POST_REQUEST:
            return {status:'SENDING'}
        case actionTypes.CREATE_POST_SUCCESS:
            return {status:'SUCCESS',error:null,post:action.payload}
        case actionTypes.CREATE_POST_FAIL:
            return {status:'FAIL',error:action.payload}
        default:
            return state
    }
}