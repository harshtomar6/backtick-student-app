import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { posts } from './reducer-post'
export default rootReducer = combineReducers({
    posts,
    form:formReducer
})