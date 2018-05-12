import * as actionTypes from './../actions-type';
import { BASE_URL } from '../../globals';
import io from 'socket.io-client';
import axios from 'axios'
// Connect Sockets
const socket = io(BASE_URL);

//Send post to server
export  function sendPost(values){
	console.log('sendPost Values',values);
	
  return async dispatch=>{

    //dispatch createPost reducer status being request
    dispatch({
      type:actionTypes.CREATE_POST_REQUEST
    })

    try{
      let res = await axios.post(`${BASE_URL}/post`,{
        level:values.level,
        attachment:values.attachments,
        text:values.text,
        postedBy:'Student'
      },{
        headers:{
            'X-Key':values.key,
            'X-Access-Token':values.token 
        }
      }) 

      //dispatch createPost reducer status being success
      dispatch({
        type:actionTypes.CREATE_POST_SUCCESS,
        post:res.data
      })
      
    }catch(err){
			//dispatch createPost reducer status being failed
			console.log(err.response);
			
      dispatch({
        type:actionTypes.CREATE_POST_FAIL,
        post:err
      })
    }

  }

}

export function setCurrentPostStatusBuild(){
	return dispatch=>{
		dispatch({
			type:actionTypes.CREATE_POST_BUILD
		})
	}
}

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