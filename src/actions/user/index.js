 // User actions  
import axios from 'axios'
import CustomAuth from './../../Utils/auth';
import { UPDATE_LIKES_POST ,UPDATE_USER_DETAILS} from './../actions-type';
import { BASE_URL } from './../../globals';

export function updateUser(data){
  return dispatch=>{
    dispatch({
        type:UPDATE_USER_DETAILS,
        payload:data
    })
  }
}

// Send Update info to server

export async function sendUpdateToServer(val){
  const url = `${BASE_URL}/student/${val.user._id}`
try{
  let updatedUser = await axios.put(url,{
      name:val.name,
      phone:val.phone,
      photoURL:val.photoURI,    
  },{
    headers:{
        'X-Key':val.key,
        'X-Access-Token':val.token 
    }
  })
  if(!updatedUser){
    
  }
 
    let localData = await CustomAuth.getUserLocalStorage() 
    let buildUser = {
        data:{key:val.key,
        token:val.token ,
        user:updatedUser.data.data},
        err:null
    }
    console.log('Response on Update',buildUser);
      
    CustomAuth.setUserLocalStorage(buildUser)

}
catch(error){
    console.log('Error:',error.response);
    
  }

}

// join a class info to server

export async function joinClassToServer(val){
    
    const url = `${BASE_URL}/class/join/${val.code}`
  try{
    let updatedUser = await axios.get(url,{
      headers:{
          'X-Key':val.key,
          'X-Access-Token':val.token 
      }
    })
    if(!updatedUser){
      
    }
   
      let localData = await CustomAuth.getUserLocalStorage() 
      let buildUser = {
          data:{key:val.key,
          token:val.token,
          user:updatedUser.data.data},
          err:null
      }
      console.log('Response on Update',buildUser);
        
      CustomAuth.setUserLocalStorage(buildUser)
  
  }
  catch(error){
      console.log('Error:',error.response);
      
    }

}