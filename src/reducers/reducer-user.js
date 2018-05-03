import _ from 'lodash'

import { UPDATE_USER_DETAILS } from '../actions/actions-type';

export function user(state={},action){
    switch(action.type){
        case UPDATE_USER_DETAILS:         
            return action.payload
        default: return state

    }
}