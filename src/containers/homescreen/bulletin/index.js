import React,{ Component } from 'react'
import { View, Text, FlatList, StatusBar } from 'react-native'
import Post from './post';
import { Spinner, Icon, Button, ActionSheet} from 'native-base';
import { tintColor } from './../../../globals';
import { SignOut, getPostsByPagination, getPosts } from '../../../actions/';
import { connect } from 'react-redux';
import _ from 'lodash';

class Bulletin extends Component{
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {}
    return {
      title:'Bulletin',
      headerRight: (
        <Button transparent style={{height: '100%', paddingHorizontal: 10}}
          onPress={params.showMore}>
          <Icon name="md-more" style={{fontSize: 30, color: tintColor}}/>
        </Button>  
      )
    }
  }

  constructor(){
    super();
    this.state = {
      pageNumber: 1
    }
  }

  componentDidMount(){
    console.log(this.props.posts);

    this.props.getPosts(this.props.posts);
    this.props.navigation.setParams({showMore: this.showMore})
  }

  showMore = () => {
    if(this.actionSheet !== null)
      this.actionSheet._root.showActionSheet({
        options: ['ding', 'dong', 'Cancel'],
        cancelButtonIndex: 2,
        title: 'More'
      }, 
        buttonIndex => {
        
        }  
      )
  }

  _renderItem = item => (
    <Post userName={item.owner.name} userId={item.owner._id} 
      thumbnail={item.owner.photoURL} text={item.text}
      attachments={item.attachment} time={item.timestamp} 
      navigation={this.props.navigation} postId={item._id}
      likes={item.likes} comments={item.comments}
      />
  );

   _loadMorePosts = () => {
    
    if(!this.props.posts.lastFetch)
      this.setState({
        pageNumber: this.state.pageNumber+1
      }, () => {
        this.props.getPostsByPagination({pageNumber: this.state.pageNumber, limit: 4});
      });
    
  }

  _handleRefresh = () => {
    this.setState({
      pageNumber: 1
    }, () => {
      this.props.getPosts();
    })
  }

  _listFooterComponent = () => {
    if(!this.props.posts.fetchingAgain)
      return null;
    
    return (
    <View style={{ paddingVertical: 10,borderTopWidth: 0.5, borderColor: "#CED0CE"}}>
      <Spinner color={ tintColor } />
    </View>
    );
  }

  render(){
    let { posts } = this.props;
    let content = '';

    if(posts.isLoading)
      content = <Spinner color={ tintColor }/>
    else if(posts.hasError)
      content = <Text>{posts.errMsg}</Text>
    else{
      let data = _.toArray(posts.data);
      content =  <FlatList data={data}
        renderItem={({item}) => this._renderItem(item)}
        refreshing={posts.isLoading}
        onRefresh={this._handleRefresh}
        keyExtractor={(item, index) => item._id}
        onEndReached={this._loadMorePosts}
        onEndThreshold={0}
        ListFooterComponent={this._listFooterComponent}
        />
    }
    return(
      <View>
        <StatusBar
          backgroundColor={tintColor}
          barStyle="light-content"
        />
        { content }
        <ActionSheet ref={e => this.actionSheet = e}/>
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