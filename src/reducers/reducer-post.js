import _ from 'lodash'

import * as actionType from '../actions/actions-type';

export function posts(state={},action){
    switch(action.type){
        case actionType.FETCH_POST:
           
            let newState = _.mapKeys(action.payload,'_id')
            
             
            return newState
        case actionType.UPDATE_LIKES_POST:
        
            newState = {...state}
            console.log(newState === state );
            newState[action.payload._id].likes = action.payload.likes
            return newState
        default: return state

    }
}

const createPostInitalState = {
    status:'BUILD',
    error:null,
    post:null
}

export function createPost(state=createPostInitalState,action){
    switch(action.type){
        case actionType.CREATE_POST_REQUEST:
            return {status:'SENDING'}
        case actionType.CREATE_POST_SUCCESS:
            return {status:'SUCCESS',error:null,post:action.payload}
        case actionType.CREATE_POST_FAIL:
            return {status:'FAIL',error:action.payload}
        default:
            return state
    }
}