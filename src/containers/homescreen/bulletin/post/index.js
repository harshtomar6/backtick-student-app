import React, { Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import CardHead from './cardHead';
import Tags from './tags';
import CardBody from './cardBody';
import CardFooter from './cardFooter';

export default class Post extends React.Component {  
  render(){
    return (
      <View style={styles.card}>
        <CardHead thumbnail={this.props.thumbnail} userName={this.props.userName} 
          time={this.props.time} navigation={this.props.navigation} userid={this.props.userId}/>
        <Tags tag={this.props.tag} />
        <CardBody text={this.props.text} attachments={this.props.attachments}
          likes={this.props.likes} comments={this.props.comments}/>
        <CardFooter postId={this.props.postId} likes={this.props.likes} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10
  }
});

Post.defaultProps = {
  userName: 'Harsh Tomar',
  thumbnail: '',
  time: '32 minutes ago',
  tag: [],
  text: 'This is an Awesome Post',
  attachments: [],
  likes: 0,
  comments: 0
}