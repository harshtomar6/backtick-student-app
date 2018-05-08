import axios from 'axios'
import {BASE_URL} from './index'

import * as actionType from './actions-type'

//Send post to server
export  function sendPost(values){
  return async dispatch=>{

    //dispatch createPost reducer status being request
    dispatch({
      type:actionType.CREATE_POST_REQUEST
    })

    try{
      let res = await axios.post(`${BASE_URl}/post`,{
        level:values.level,
        attachment:values.attachments,
        text:values.text,
        postedBy:'student'
      },{
        headers:{
            'X-Key':values.key,
            'X-Access-Token':values.token 
        }
      }) 

      //dispatch createPost reducer status being success
      dispatch({
        type:actionType.CREATE_POST_SUCCESS,
        post:res.data
      })
      
    }catch(err){
      //dispatch createPost reducer status being failed
      dispatch({
        type:actionType.CREATE_POST_FAIL,
        post:err
      })
    }

  }

}