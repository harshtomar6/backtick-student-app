import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class Post extends React.Component {

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Text>{this.props.userName}</Text>
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
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10
  },
  cardHead: {
    padding: 15,
  }
});

Post.defaultProps = {
  userName: 'JhunJhun Wala'
}

export default Post;