import React,{ Component } from 'react'
import _ from 'lodash'
import {
    View
} from 'react-native'
import {  Card, CardItem, Text, Button, Icon, Left, Body, Right, Badge } from 'native-base';
class Post extends Component{
    constructor(props){
        super(props)
        this.state={
          likes:null
        }
    }
    shouldComponentUpdate(){
      if(!_.isEmpty(this.props.post)){
        if(this.props.post.likes === this.state.likes){
          //console.log("Not Rerendering");
          return false
        }
        return true
      }
      else{
        //console.log("Not Rerendering");
        return false
      }
      
    }

    componentDidUpdate(){
      //console.log("componentDidUpdate",this.state.likes,this.props.post.likes);
      this.setState({
        likes:this.props.post.likes
      })
    }
    render(){
      //console.log("Rerendering");
      
      return(
        <Card>
            <CardItem cardBody>
              <Text>{this.props.post.text}</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent
                  onPress={()=>{
                    console.log('emit is called on post ',this.props.post._id);
                    
                    this.props.emitLike(this.props.post._id)
                  }}
                >
                  <Icon active name="thumbs-up" />
                  <Badge primary>
                    <Text>{this.props.post.likes}</Text>
                  </Badge>
                  
                </Button>
              </Left>
            </CardItem>
        </Card>
      )
    }
}

export default Post