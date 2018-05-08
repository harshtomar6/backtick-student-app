import React, { Component } from 'react'
import {
    View,
    AppState, StatusBar
} from 'react-native'
import _ from 'lodash'
import {
    Spinner
} from 'native-base'
import { connect } from "react-redux";

//Local imports
import {updateUser} from '../actions' 
import {addListener} from '../Utils/events'
import { checkSignIn } from '../actions/'
import { tintColor } from '../globals';

class AuthLoading extends Component{

    constructor(props){
        super(props)
        
        this.onFail = this.onFail.bind(this)
    }
    componentDidMount(){
        console.log('Called from componentDidMount');
        
        AppState.addEventListener('change',()=>{
            console.log(AppState.currentState);
            
        })
        
        addListener('auth-state-change',()=>checkSignIn(this.onSuccess.bind(this),this.onFail))
        checkSignIn(this.onSuccess.bind(this),this.onFail)
    }
    
      onSuccess(val,data){
          console.log('OnSuccess is called from google sign in ',data);
          
          if(val === "emailunvarified"){
            console.log("Go to VarifyEmail");
            this.props.navigation.navigate('VerifyEmail')
          }
          if(val === "allok"){
            
            if(data.user.phone === '' || data.user.phone === null || data.user.phone === 'none'){
                this.props.navigation.navigate('InitScreen')
            }
            else if(!data.user.classJoined){
                
                this.props.navigation.navigate('Join')
            }
            else {
                this.props.updateUser(data)
                this.props.navigation.navigate('SignedIn')
            }
                
          }
      }

      onFail(){
        this.props.navigation.navigate('SignedOut')
      }
    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <StatusBar backgroundColor={tintColor} />
                <Spinner color={tintColor} />
            </View>
        )
    }
}


export default connect(null,{updateUser})(AuthLoading)