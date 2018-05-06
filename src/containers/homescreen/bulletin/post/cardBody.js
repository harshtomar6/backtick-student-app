import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import Attachment from './attachments';

export default class CardBody extends React.Component {

  render(){
    return (
      <View style={styles.cardBody}>
        <Text style={styles.mainText}>{this.props.text}</Text>
        <Attachment attachments={this.props.attachments} />
        <View style={styles.likesWrap}>
          <Text style={{fontSize: 12}}>
            {this.props.likes} likes | {this.props.comments} comments
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  cardBody: {
    padding: 16,
    paddingBottom: 5
  },
  mainText: {
    color: '#000',
    fontSize: 18
  },
  likesWrap: {
    paddingTop: 10
  }
}

CardBody.defaultProps = {
  text: '',
  attachments: [],
  likes: 0,
  comments: 0
}