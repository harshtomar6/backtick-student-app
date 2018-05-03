import React,{ Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'

import {SignOut} from '../../../actions/'

class Bulletin extends Component{
    static navigationOptions = {
        title:'Bulletin',
        headerRight: (
            <Button
              onPress={() => SignOut()}
              title="SignOut"
              color="#000"
            />
          )
    }
    render(){
        return(
            <View>
                <Text>View Bulletin</Text>
            </View>
        )
    }
}

export default Bulletin