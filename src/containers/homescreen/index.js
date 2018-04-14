import React,{ Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    FlatList,
    ScrollView,
    Button
} from 'react-native'
import SocketIOClient from 'socket.io-client';

import { BASE_URL, fetchPosts, updateLikes,SignOut } from '../../actions'
import Post from '../post'
class HomeScreen extends Component{

    static navigationOptions = {
        title:'BackTick',
        headerRight: (
            <Button
              onPress={() => SignOut()}
              title="SignOut"
              color="#000"
            />
          )
    }
    constructor(props){
        super(props)

        this.socket = SocketIOClient(BASE_URL)
        this.emitLike = this.emitLike.bind(this)
    }
    componentDidMount(){
        this.props.fetchPosts()

        

        this.socket.on('post-liked', (data) => {
            console.log(data);
            this.props.updateLikes(data)
            // React will automatically rerender the component when a new message is added.
            
          });
        
    }

    emitLike(id){
        this.socket.emit('like-post',id)
    }
    renderPosts=()=>{
        
        
        if(_.isEmpty(this.props.posts))
            return <Text> Loading </Text>
        console.log(_.values(this.props.posts));
        
     
        
        return _.map(this.props.posts,(post)=>{
            
            return <Post key={post._id} emitLike={this.emitLike} post={post} />
        })
    }
    render(){
        return(
            <View>
                <ScrollView>
                {this.renderPosts()}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps({posts}){
    return{
        posts
    }
}
export default connect(mapStateToProps,{ fetchPosts, updateLikes })(HomeScreen)