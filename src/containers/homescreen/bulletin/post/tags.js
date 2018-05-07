import React from 'react';
import { View, StyleSheet, Text} from 'react-native';

class Tags extends React.Component{
  render(){
    return (
      <View style={styles.cardTags}>
        {
          this.props.tag.map(tag => 
            <View style={[styles.tag, {borderColor: 'green'}]}>
              <Text style={{color: 'green', fontSize: 11}}>{tag}</Text>
            </View>   
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 15,
    paddingRight: 15,
  },
  tag: {
    margin: 5,
    borderRadius: 50,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1
  }
});

Tags.defaultProps = ({
  tag: []
})

export default Tags;