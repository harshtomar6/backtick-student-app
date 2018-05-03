import React,{ Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    Button
} from 'react-native'
import { Input ,Label } from 'native-base';

class UpdateInfo extends Component{
    static navigationOptions = {
        title:'Update Info',
    }
    componentDidMount(){
        console.log(this.props.navigation.state.params);
        
    }
    render(){
        return(
            <View>
                <ScrollView>
                    <Input placeholder={'email'} value={'ashwaniparker@gmail.com'}/> 
                    <Input placeholder={'Name'}/>
                    <Input placeholder={'Phone No'}/>
                </ScrollView>
                <View><Button title="UPDATE"/></View>
            </View>
        )
    }
}

export default UpdateInfo