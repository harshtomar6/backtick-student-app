import React,{ Component } from 'react'
import {
    View,
    Text
} from 'react-native'


class CreatePost extends Component{
    static navigationOptions = {
        title:'CreatePost',
        header:null
    }
    render(){
        return(
            <View>
                <Text>Create Post Here</Text>
            </View>
        )
    }
}

export default CreatePost