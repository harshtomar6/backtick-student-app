import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { posts } from './reducer-post'
import { user } from './reducer-user'
export default rootReducer = combineReducers({
    posts,
    user,
    form:formReducer
})