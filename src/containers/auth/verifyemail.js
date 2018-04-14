import React,{ Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { SignOut } from '../../actions/index'
export default class VarifyEmail extends Component{


    render(){
        return(
            <View>
                <Text>VARIFY EMAIL</Text>
                <Text>We have emaillied you an email varification</Text>
                <Button title="Resend Varification Link"/>
                <Button title="Login" onPress={()=>{
                    SignOut()
                    this.props.navigation.navigate('SignedOut')
                }}/>
            </View>
        )
    }
}