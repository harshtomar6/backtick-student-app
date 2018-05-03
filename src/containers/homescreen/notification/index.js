import React,{ Component } from 'react'
import {
    View,
    Text
} from 'react-native'
import { tintColor } from './../../../globals';


class Notification extends Component{
    static navigationOptions = {
        title:'Notification',
        headerTitleStyle: {
            color: tintColor
        }
    }
    render(){
        return(
            <View>
                <Text>View Notification</Text>
            </View>
        )
    }
}

export default Notification