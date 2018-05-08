import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'native-base';

export default class CardFooter extends React.Component {

  constructor(){
    super();
    this.state = {
      liked: false,
      saved: false,
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
    );
  }
}

const styles = StyleSheet.create({
  cardFooter: {
    flexDirection: 'row',
  },
  footerBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 0.5,
    marginTop: 10,
    flexDirection: 'row'
  }
})