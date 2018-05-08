import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { posts,createPost } from './reducer-post'
import { user } from './reducer-user'
export default rootReducer = combineReducers({
    posts,
    user,
    createPost,
    form:formReducer
})