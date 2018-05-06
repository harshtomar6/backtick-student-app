import * as actionTypes from './../actions-type';
import { BASE_URL } from './../../globals';

export function getPosts(){
	return dispatch => {
		dispatch({type: actionTypes.GET_POST_REQUEST});
		return fetch(BASE_URL+'/post')
			.then(res => res.json())
			.then(resData => {
				if(resData.err)
					dispatch({
						type: actionTypes.GET_POST_ERROR,
						payload: resData.err 
					});
				else
					dispatch({
						type: actionTypes.GET_POST_SUCCESS,
						payload: resData.data
					})
			})
			.catch(err => {
				dispatch({
					type: actionTypes.GET_POST_ERROR,
					payload: JSON.stringify(err)
				})
			})
	}
}

export function updateLikes(data){
  return dispatch=>{
      dispatch({
          type:UPDATE_LIKES_POST,
          payload:data
      })
  }
}