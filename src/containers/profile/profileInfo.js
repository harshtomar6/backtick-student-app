import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, CardItem, Left, Body, Icon } from 'native-base';
import { tintColor } from '../../globals';

export default class ProfileInfo extends React.Component {

  render(){
    return (
      <View style={styles.card}>
        <View>
          <Text note> About</Text>
          <CardItem>
            <Icon name="ios-contact" style={styles.icon}/> 
            <Text style={{marginLeft: 10}}>{this.props.position}</Text>
          </CardItem>
          <CardItem>
            <Icon name="ios-mail" style={[styles.icon, {color: 'red'}]}/> 
            <Text style={{marginLeft: 10}}>{this.props.email}</Text>
          </CardItem>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card:{
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10
  },
  icon: {
    color: tintColor, 
    fontSize: 40
  }
});

ProfileInfo.defaultProps = {
  position: 'Student At lauda lehsun',
  email: 'muhmelelo@gmail.com'
}