
import axios from 'axios'
import firebase from 'react-native-firebase'

import CustomAuth from '../Utils/auth'
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { FETCH_POST , UPDATE_LIKES_POST ,UPDATE_USER_DETAILS} from './actions-type';
 export const BASE_URL = 'https://backtick-api.herokuapp.com'



 export function fetchPosts(){
     
     
     const url = `${BASE_URL}/post/test`
     return dispatch=>{
         axios.get(url)
            .then(data=>{
                //console.log('fetchPost is called',data.data.data);
                dispatch({
                    type:FETCH_POST,
                    payload:data.data.data
                })
            })
            .catch(e=>{
                console.log("Error fetching posts ",e);
                
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

async function  signInUserToServer(user){
    const BASE_URL = 'https://backtick-api.herokuapp.com/student/social?key=asdjkawdioadjskdsadlasd'

   return  axios.post(BASE_URL,{
        name:user.name,
        email:user.email,
        providerData:user.providerData,
        photoURL:user.photoURL,
        emailVerified:user.emailVerified,
        'X-Access-Key':'asdjkawdioadjskdsadlasd'
    })
    // .then(res=>{
    //     console.log("Successfull",res);
    //     CustomAuth.setUserLocalStorage(res.data)
    // })
    // .catch(e=>{
    //     console.log("Error",e);
    //      throw new Error('Error ')
    // })
    
 }
 //Firebase integration

 //Google OAuth

 

// Calling this function will open Google for login.
function buildUser(rawUser,provider){
    let user = {}
    if(provider === 'google'){
        user={
            name:rawUser.name,
            email:rawUser.email,
            photoURL:rawUser.photo,
            emailVerified:true,
            providerData:provider
        }
    }
    else if(provider === 'facebook'){
        user={
            name:rawUser.displayName,
            email:rawUser.email,
            photoURL:rawUser.photoURL,
            emailVerified:true,
            providerData:provider
        }
    }
    else{

    }
    return user
}
export const googleLogin = async (fail) => {
    console.log("Google Sign in");
  try {
    // Add any configuration settings here:
    await GoogleSignin.configure();
    
    const data = await GoogleSignin.signIn();
    console.log('Data from Google ',data );
    
    const res = await signInUserToServer(buildUser(data,'google'))
    console.log("Successfull",res);
    CustomAuth.setUserLocalStorage(res.data)
    
  } catch (e) {
    console.log(JSON.stringify(e));
    fail({Error:e,from:'googlesignin'})
    //console.error(e);
  }
}

// Calling the following function will open the FB login dialogue:
export const facebookLogin = async (fail) => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
  
      if (result.isCancelled) {
        throw new Error('User cancelled request'); // Handle this however fits the flow of your app
      }
  
      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
  
      // get the access token

      const data = await AccessToken.getCurrentAccessToken();
 
      //console.log(data)
      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }
  
      // create a new firebase credential with the token
      
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      //console.log(credential);
      
      if(!credential){
          console.log(e);
          throw {error:e}
      }
     
      
      // login with credential
      
        const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        if(!currentUser){
            console.log(e);
           
            throw {error:e}
        }
        
        //console.log('User after login form facebook',currentUser.user._user);
        const res = await signInUserToServer(buildUser(currentUser.user._user,'facebook'))
        console.log("Successfull",res);
        CustomAuth.setUserLocalStorage(res.data)
        console.info(JSON.stringify(currentUser.user.toJSON()))
    } catch (e) {
        
      console.log(JSON.stringify(e));
      fail({Error:e,from:'fbsignin'})
      //console.error(JSON.stringify(e));
    }
  }

// Calling this function will log using username and password

export const signInWithEmailAndPassword = async (values)=>{
    try{
        const currentUser = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(values.email,values.password)
        console.log("Login Successfull",currentUser);
        
    }
    catch(e){
        console.error(e)
    }
}

// Calling this function will log using username and password
export function createUserWithEmailAndPassword(values,onSuccess,onFail){
    
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(values.email,values.password)
            .then(user=>{
                if(!user.varified){
                    firebase.auth().currentUser.sendEmailVerification().then(function() {
                        // Email sent.
                        onSuccess()
                      }).catch(function(error) {
                        // An error happened.
                        onFail({error:"Cannot Varify Email"})
                      });
                }
            })
            .catch(e=>{
                onFail({error:e})
            })
        
 
}

// Upload to firebase 
export   function uploadToFirebase(file,contentType,str){
    
    let metadata = {
        contentType
        };

    const r = Math.random()*Number.parseInt((Date.now()))
    const storage = firebase.storage().ref().child(`${str}${r}.jpg`)
    var uploadTask = storage.put(file,metadata)
    return new Promise((resolve,reject)=>{
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

                case 'storage/canceled':
                // User canceled the upload
                break;
                case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
        }, function(snapshot) {
            // Upload completed successfully, now we can get the download URL
            console.log('Successfully upload');
            
            
            storage.getDownloadURL().then(url=>{
                
                
                return resolve(url)
            })
            
            
        })

        
    })
    
    
}
// Calling this function will check if user is already logged in
// export const checkLogin = async ()=>{
//     console.log("Check Login");

//     try{

//         const status = await GoogleSignin.currentUser()
//         console.log(status);
        
//     }
//     catch(e){
//         console.log("Error in checking Login",e);
        
//     }
// }

//Calling this function will send an email for password verification
export function sendEmailOnForgotPassword(values,success,fail){
    firebase.auth().sendPasswordResetEmail(values.email)
    .then(()=>{
        console.log("Successfully send the password reset email");
        
        success()
    })
    .catch(e=>{
        fail(e)
    })
}
export function addEmailVerification(){
    const user = firebase.auth().currentUser
    firebase.firestore().collection('users').doc(user._user.email).set({varified:false})
        .then()
        .catch()
}

export async function checkSignIn(success,fail){
    
    try{
        const user = await CustomAuth.onAuthStateChange()
        console.log("checkSignIn is Called",user)
        if(user  !== ''){
            // User is signed in.
            console.log(user);
        
            const facebook = user.data.user.providerData[0] === 'facebook.com'
            console.log("Facebook:",facebook);
            if(!facebook){
                console.log("Not by facebook");
                if(!user.data.user.emailVerified){
                    console.log("Sending Varification Email");
                    success('emailunvarified')
                }
                else{
                    console.log("All ok");
                    success('allok',user.data)
                }

            }
            else 
            {   console.log("All ok");
            
                success('allok',user.data)
            }               
            
        
        }
        else{
            fail()
        }
    }
    catch(err){
        fail()
    }

    /*
     firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
  
      // User is signed in.
        console.log(user);
       
        const facebook = user._user.providerData[0].providerId === 'facebook.com'
        console.log("Facebook:",facebook);
        if(!facebook){
            console.log("Not by facebook");
            if(!user._user.emailVerified){
                console.log("Sending Varification Email");
                success('emailunvarified')
            }
            else{
                console.log("All ok");
                success('allok',user._user)
            }

        }
        else 
        {   console.log("All ok");
        
            success('allok',user._user)
        }               
        
      
    } else {
  
      // No user is signed in.
      console.log("NO USER FOUND")
      
      fail()
    }
  })
    */
  }

  //Get firebase user
  export  function getUser(){
    
        return CustomAuth.getUserLocalStorage()
        
      
  }

  export function SignOut(){
      CustomAuth.removeUserLocalStorage()
    //   firebase.auth().signOut()
    //     .then(()=>{
    //        console.log("Sign Out Successfull");
           
    //     })
    //     .catch(e=>{
            
    //     })
  }

  // User actions 

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