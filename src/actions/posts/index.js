import * as actionTypes from './../actions-type';
import { BASE_URL } from './../../globals';
import io from 'socket.io-client';

// Connect Sockets
const socket = io(BASE_URL);

export function getPosts(storedState){
	return dispatch => {
		dispatch({type: actionTypes.GET_POST_REQUEST});
		return fetch(`${BASE_URL}/post/page/1?limit=4`)
			.then(res => res.json())
			.then(resData => {
				if(resData.err)
					dispatch({
						type: actionTypes.GET_POST_SUCCESS,
						payload: storedState.data
					})
				else
					dispatch({
						type: actionTypes.GET_POST_SUCCESS,
						payload: resData.data
					})
			})
			.catch(err => {
				dispatch({
					type: actionTypes.GET_POST_SUCCESS,
					payload: storedState.data
				})
				console.log(err);
				
			})
	}
}

export function getPostsByPagination(data){
	return dispatch => {
		dispatch({type: actionTypes.RE_GET_POST_REQUEST});
		return fetch(`${BASE_URL}/post/page/${data.pageNumber}?limit=${data.limit}`)
			.then(res => res.json())
			.then(resData => {
				if(resData.err)
					dispatch({
						type: actionTypes.RE_GET_POST_ERROR,
						payload: resData.err 
					});
				else
					dispatch({
						type: actionTypes.RE_GET_POST_SUCCESS,
						payload: resData.data
					})
			})
			.catch(err => {
				dispatch({
					type: actionTypes.RE_GET_POST_ERROR,
					payload: JSON.stringify(err)
				})
			})
	}
}

export function likePost(data){
	return dispatch => {
		dispatch({
			type: actionTypes.UPDATE_LIKES_POST,
			payload: data
		});
		socket.emit('/post/like', data);
	}
}

export function updateLikes(data){
  return dispatch=>{
      dispatch({
          type: actionTypes.UPDATE_LIKES_POST,
          payload:data
      })
  }
}

socket.on('like-success', data => {
	alert('liked');
});

socket.on('like-err', err => {
	alert('err');
})