import React,{ Component } from 'react'
import {
    View,
    Text,
    Button,
    ScrollView, StatusBar
} from 'react-native'
import Post from './post';
import { tintColor } from './../../../globals';

import {SignOut} from '../../../actions/'

class Bulletin extends Component{
    static navigationOptions = {
        title:'Bulletin',
        headerTitleStyle: {
            color: tintColor
        },
        headerRight: (
            <Button
              onPress={() => SignOut()}
              title="SignOut"
              color={tintColor}
            />
          )
    }
    render(){
        return(
            <ScrollView>
                <StatusBar
                    backgroundColor={tintColor}
                    barStyle="light-content"
                />
                <Post />
                <Post userName='Ashwani Arya' time='45 minutes ago' text='This is really amazing'
                    attachments={[{type: 'IMAGE', url: 'https://images.pexels.com/photos/1003816/pexels-photo-1003816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}, {'type': 'IMAGE', 'url': 'https://lh6.googleusercontent.com/-r_iIdnS0lng/AAAAAAAAAAI/AAAAAAAAHOM/l1hIpvCQWTY/photo.jpg'}]}/>
                <Post userName='Akash ' time='55 minutes ago' text='Guys... We have to submit OS assignment before Monday'
                    attachments={[{type: 'IMAGE', url: 'https://ce8d52bcc.cloudimg.io/width/500/x/https://firebasestorage.googleapis.com/v0/b/backtick-syncoders.appspot.com/o/img1104143116031.834.jpg?alt=media&token=71a8c982-81e5-4a11-a765-cda072f65cc9'}, {type: 'IMAGE', url: 'https://ce8d52bcc.cloudimg.io/width/500/x/https://firebasestorage.googleapis.com/v0/b/backtick-syncoders.appspot.com/o/img282261933011.7133.jpg?alt=media&token=41aa3b8b-988f-43f5-a0c4-7b988416cd41'}]}/>
                <Post attachments= {[{type: 'IMAGE', url: 'https://ce8d52bcc.cloudimg.io/width/500/x/https://firebasestorage.googleapis.com/v0/b/backtick-syncoders.appspot.com/o/img966269545951.29.jpg?alt=media&token=0b1ca272-45c8-4bcd-b2f8-5c333dd31ee4'}, {type: 'IMAGE', url: 'https://images.pexels.com/photos/1003816/pexels-photo-1003816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}, {'type': 'IMAGE', 'url': 'https://lh6.googleusercontent.com/-r_iIdnS0lng/AAAAAAAAAAI/AAAAAAAAHOM/l1hIpvCQWTY/photo.jpg'}]}/>
                <Post 
                    attachments={[{type: 'IMAGE', url: 'https://lh6.googleusercontent.com/-r_iIdnS0lng/AAAAAAAAAAI/AAAAAAAAHOM/l1hIpvCQWTY/photo.jpg'}]}/>
            </ScrollView>
        )
    }
}

export default Bulletin