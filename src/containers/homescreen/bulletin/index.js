import React,{ Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import Post from './post';

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
                <Post />
            </View>
        )
    }
}

export default Bulletin