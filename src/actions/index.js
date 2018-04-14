
import axios from 'axios'
import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { FETCH_POST , UPDATE_LIKES_POST } from './actions-type';
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

 //Firebase integration

 //Google OAuth

 

// Calling this function will open Google for login.
export const googleLogin = async (fail) => {
    console.log("Google Sign in");
  try {
    // Add any configuration settings here:
    await GoogleSignin.configure();
    
    const data = await GoogleSignin.signIn();
    console.log("SIGNED USER",data);
    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
    // login with credential
    const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

    console.info(currentUser.user.toJSON());
    
  } catch (e) {
    fail(e)
    console.error(e);
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
  
      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }
  
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
     
      
      // login with credential
      try{
        const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        console.log(currentUser);
      }
      catch(e){
          console.log(e);
         
          throw {error:e}
      }

      console.info(JSON.stringify(currentUser.user.toJSON()))
    } catch (e) {
        
      console.log(JSON.stringify(e));
      fail(JSON.stringify(e))
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

export function checkSignIn(success,fail){
    
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
        }
        else 
        {   console.log("All ok");
        
            success('allok')
        }               
        
      
    } else {
  
      // No user is signed in.
      console.log("NO USER FOUND")
      
      fail()
    }
  })
    
  }


  export function SignOut(){
      firebase.auth().signOut()
        .then(()=>{
           console.log("Sign Out Successfull");
           
        })
        .catch(e=>{
            
        })
  }