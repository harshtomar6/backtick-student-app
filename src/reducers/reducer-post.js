import _ from 'lodash'

import { FETCH_POST, UPDATE_LIKES_POST } from '../actions/actions-type';

export function posts(state={},action){
    switch(action.type){
        case FETCH_POST:
           
            let newState = _.mapKeys(action.payload,'_id')
            
             
            return newState
        case UPDATE_LIKES_POST:
        
            newState = {...state}
            console.log(newState === state );
            newState[action.payload._id].likes = action.payload.likes
            return newState
        default: return state

    }
}