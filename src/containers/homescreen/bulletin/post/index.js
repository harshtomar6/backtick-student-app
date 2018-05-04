import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

class Post extends React.Component {

  constructor(){
    super();
    this.state = {
      liked: false,
      saved: false
    };
  }

  getAttachments = () => {
    return this.props.attachments.map((attachment, index) => {
      switch(this.props.attachments.length){
        case 1:
          return this.mapAttachment(attachment);
        case 2:
          return (
            <View style={styles.attachCount2}>
              {this.mapAttachment(attachment)}
            </View>
          );
        case 3:
          if(index === 0 || index === 2)
            return (
              <View style={styles.attachCount2}>
                {this.mapAttachment(attachment)}
              </View>
            )
          else if(index === 1)
            return(
              <View style={styles.attachCount2}>
                <View>
                  {this.mapAttachment(attachment)}
                </View>
              </View>
            )
      } 
    });
  }

  mapAttachment = (attachment) => {
    switch(attachment.type){
      case 'IMAGE':
        return <Image source={{uri: attachment.url}} 
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}/>
      default:
        return <View />
    }
  }

  handleLike = () => {
    this.setState({liked: !this.state.liked})
  }

  handleComment = () => {

  }

  handleSave = () => {
    this.setState({saved: !this.state.saved})
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Image source={{uri: this.props.thumbnail}} style={styles.thumbnail}/>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>{this.props.userName}</Text>
              <Text style={styles.note}>{this.props.time}</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.mainText}>{this.props.text}</Text>
            <View 
              style={[styles.attachMents, 
                {
                  height: this.props.attachments.length > 0 ? 250 : 0,
                  paddingTop: this.props.attachments.length > 0 ? 15 : 0,
                  paddingBottom: this.props.attachments.length > 0 ? 10 : 0 
                }]}>
              {this.getAttachments()}
            </View>
          </View>
          <View style={styles.cardFooter}>
            <TouchableOpacity style={styles.footerBtn} onPress={this.handleLike}>
              <Icon name={this.state.liked ? "ios-thumbs-up": 'ios-thumbs-up-outline'} 
                style={{color: this.state.liked ? '#0074E4' : '#666'}}/>
              <Text style={{color: this.state.liked ? '#0074E4' : '#666'}}>&nbsp;&nbsp;Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerBtn} onPress={this.handleComment}>
              <Icon name="ios-text-outline" style={{color: '#666'}} />
              <Text>&nbsp;&nbsp;Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerBtn} onPress={this.handleSave}>
              <Icon name={this.state.saved ? "ios-star": "ios-star-outline"} 
                style={{color: this.state.saved ? '#FF6138' : '#666'}} />
              <Text style={{color: this.state.saved ? '#FF6138' : '#666'}}>&nbsp;&nbsp;Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
    
  }

}

const styles = StyleSheet.create({
  container: {
  },
  card: {
    backgroundColor: '#fff',
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10
  },
  cardHead: {
    padding: 15,
    flexDirection: 'row'
  },
  titleWrap: {
    flexDirection: 'column'
  },
  thumbnail: {
    width: 50, 
    height: 50, 
    borderRadius: 50,
    marginRight: 20
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight:'500'
  },
  note: {
    color: '#999'
  },
  cardBody: {
    padding: 16
  },
  mainText: {
    color: '#000',
    fontSize: 18
  },
  cardFooter: {
    flexDirection: 'row',
  },
  footerBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderTopColor: '#999',
    borderTopWidth: 0.2,
    marginTop: 10,
    flexDirection: 'row'
  },
  attachMents: {
    height: 250,
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  attachCount2: {
    flex: 1
  }
});

Post.defaultProps = {
  userName: 'Harsh Tomar',
  thumbnail: 'https://ce8d52bcc.cloudimg.io/width/500/x/https://lh6.googleusercontent.com/-r_iIdnS0lng/AAAAAAAAAAI/AAAAAAAAHOM/l1hIpvCQWTY/photo.jpg',
  time: '32 minutes ago',
  text: 'This is an Awesome Post',
  attachments: []
}

export default Post;