import React,{ Component } from 'react'
import {
    View,
    Text
} from 'react-native'


class Notification extends Component{
    static navigationOptions = {
        title:'Notification',
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