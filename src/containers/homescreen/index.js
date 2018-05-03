import React,{ Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    FlatList,
    ScrollView,
    Button,
    TouchableOpacity
} from 'react-native'
import YouTube from 'react-native-youtube'
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
        this.state={
            istaken:false,
            cardname:'card1'
        }
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

    checkAndMountPlayer(val){
        this.setState({
            cardname:val
        })
    }
    renderYouTube(videoId){
        return (
            <YouTube
                videoId={videoId}   // The YouTube video ID
                play={true}            // control playback of video with true/false
                fullscreen={false}      // control whether the video should play in fullscreen or inline
                loop={true}             // control whether the video should loop when ended
                resumePlayAndroid={true}
                apiKey="AIzaSyC7-Z3zEHlwHQofHXZu-a48gQxfFxgk_v0"
                controls={2}
                onReady={e => this.setState({ isReady: true })}
                onChangeState={e => this.setState({ status: e.state })}
                onChangeQuality={e => this.setState({ quality: e.quality })}
                onError={e => this.setState({ error: e.error })}
                showFullscreenButton={true}
                style={{ alignSelf: 'stretch', height: 250 }}
            />
        )
    }
    renderView(val){
        return (
            <TouchableOpacity onPress={()=>this.checkAndMountPlayer(val)} style={{ alignSelf: 'stretch',justifyContent:'center',alignItems:'center', backgroundColor:'red', height: 250 }}>
            </TouchableOpacity>
        )
    }
    render(){
        return(
            <View>

                <ScrollView>
                        {  
                            this.state.cardname==='card1'?this.renderYouTube("zINcs5IH5PY"):this.renderView('card1')
                        
                        }
                        {  
                            this.state.cardname==='card2'?this.renderYouTube("eMifa9zkezY"):this.renderView('card2')
                        
                        }
                        {  
                            this.state.cardname==='card3'?this.renderYouTube("zINcs5IH5PY"):this.renderView('card3')
                        
                        }
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