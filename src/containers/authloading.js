import React, { Component } from 'react'
import {
    View,
    AppState
} from 'react-native'

import {
    Spinner
} from 'native-base'

import { checkSignIn } from '../actions/'

export default class AuthLoading extends Component{

    constructor(props){
        super(props)
        
        this.onFail = this.onFail.bind(this)
    }
    componentDidMount(){
        console.log('Called from componentDidMount');
        
        AppState.addEventListener('change',()=>{
            console.log(AppState.currentState);
            
        })
        checkSignIn(this.onSuccess.bind(this),this.onFail)
      }
    
      onSuccess(val){
          if(val === "emailunvarified"){
            console.log("Go to VarifyEmail");
            this.props.navigation.navigate('VerifyEmail')
          }
          if(val === "allok"){
            this.props.navigation.navigate('SignedIn')
          }
      }

      onFail(){
        this.props.navigation.navigate('SignedOut')
      }
    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Spinner color='blue' />
            </View>
        )
    }
}

