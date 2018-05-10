import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import CalculateTime from './calculateTime';

class CardHead extends React.Component{

  handlePress = () => {
    this.props.navigation.navigate('Profile', {
      name: this.props.userName,
      thumbnail: this.props.thumbnail,
      id: this.props.userid
    });
  }

  render(){
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={styles.cardHead}>
          <Image source={{uri: this.props.thumbnail}} style={styles.thumbnail}/>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>{this.props.userName}</Text>
            <CalculateTime style={styles.note} timestamp={this.props.time}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
  }
})

CardHead.defaultProps = {
  thumbnail: '',
  timestamp: '',
  userName: ''
}

export default CardHead;