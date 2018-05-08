import React,{ Component } from 'react'
import { View, Text, FlatList, StatusBar, Button } from 'react-native'
import Post from './post';
import { Spinner, Icon} from 'native-base';
import { tintColor } from './../../../globals';
import { SignOut, getPostsByPagination, getPosts } from '../../../actions/';
import { connect } from 'react-redux';

class Bulletin extends Component{
  static navigationOptions = {
    title:'Bulletin',
    headerStyle: {
      justifyContent: 'center'
    },
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

  constructor(){
    super();
    this.state = {
      pageNumber: 1
    }
  }

  componentDidMount(){
    this.props.getPosts();
  }

  _renderItem = item => (
    <Post userName={item.owner.name} userId={item.owner._id} 
      thumbnail={item.owner.photoURL} text={item.text}
      attachments={item.attachment} time={item.timestamp}
      />
  )

  _loadMorePosts = () => {
    this.setState({
      pageNumber: this.state.pageNumber+1
    }, () => {
      this.props.getPostsByPagination({pageNumber: this.state.pageNumber, limit: 5})
    });
    
  }

  _handleRefresh = () => {
    this.setState({
      pageNumber: 1
    }, () => {
      this.props.getPosts();
    })
  }

  render(){
    let { posts } = this.props;
    let content = '';

    if(posts.isLoading)
      content = <Spinner color={ tintColor }/>
    else if(posts.hasError)
      content = <Text>{posts.errMsg}</Text>
    else
      content =  <FlatList data={posts.data}
        renderItem={({item}) => this._renderItem(item)}
        refreshing={posts.fetchingAgain}
        onRefresh={this._handleRefresh}
        keyExtractor={(item, index) => item._id}
        onEndReached={this._loadMorePosts}
        onEndReachedThreshold={2}
        />

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

export default connect(mapStateToProps, { 
  getPosts, 
  getPostsByPagination 
})(Bulletin)