import React,{ Component } from 'react'
import {
    View,
    Text,
    Button,
    FlatList, StatusBar
} from 'react-native'
import Post from './post';
import { Spinner } from 'native-base';
import { tintColor } from './../../../globals';
import { SignOut, getPosts } from '../../../actions/';
import { connect } from 'react-redux';

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

  componentDidMount(){
    this.props.getPosts();
  }

  render(){
    let { posts } = this.props;
    let content = '';

    if(posts.isLoading)
      content = <Spinner color={tintColor}/>
    else if(posts.hasError)
      content = <Text>{posts.errMsg}</Text>
    else
      content =  <FlatList data={posts.data}
                    renderItem={({item}) => 
                      <Post userName={item.owner.name} 
                        thumbnail={item.owner.photoURL} text={item.text}
                        attachments={item.attachment} time={item.timestamp}/>
                      }/>

    return(
      <View>
        <StatusBar
          backgroundColor={tintColor}
          barStyle="light-content"
        />
        { content }
      </View>
    )
  }
}

const mapStateToProps = (state)=> ({
  posts: state.posts
});

export default connect(mapStateToProps, {getPosts})(Bulletin)