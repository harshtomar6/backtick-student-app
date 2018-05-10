import React from 'react';
import { View, Text, StyleSheet, Image, Animated, 
  ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { tintColor } from '../../globals';
import { Icon, Button } from 'native-base';
import ProfileInfo from './profileInfo';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 55;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class Profile extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  }

  constructor(){
    super();
    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

  scrollElements = () => {
    let ele = <ProfileInfo />

    return ele;
  }

  render(){
    const { params } = this.props.navigation.state;
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const headerTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [1, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    })

    const backIconColor = this.state.scrollY.interpolate({
      inputRange: [1, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: ['#fff', '#fff', tintColor],
      extrapolate: 'clamp'
    });

    const AnimatedIcon = Animated.createAnimatedComponent(Icon);
    const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
    return (
      <View style={{backgroundColor: '#eee', flex: 1}}>
        
        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <Animated.View style={[styles.header, {height: headerHeight}]}>
            <Animated.Image source={{uri: params.thumbnail}} 
              style={[styles.image, {opacity: imageOpacity, }]}/>
            <AnimatedLinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)']} 
              style={[styles.textWraper, {opacity: imageOpacity}]}>
              <Text style={styles.name}>{params.name}</Text>
            </AnimatedLinearGradient>
          </Animated.View>
          <View style={styles.innerHeader}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <AnimatedIcon name="arrow-back" 
                style={{color: backIconColor, marginTop: 10}}/>
            </Button>
            <Animated.Text 
              style={[styles.headerTitle, {opacity: headerTitleOpacity}]}>
              {params.name}
            </Animated.Text>
          </View>
        </Animated.View>
        
        <ScrollView style={{flex: 1}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: { contentOffset: {y: this.state.scrollY}}}]
          )}>
          <View style={{marginTop: HEADER_MAX_HEIGHT}}>
            {this.scrollElements()}
            <ProfileInfo position="madarchod" email="chutiya@gmail.com"/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  header: {
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    zIndex: 5,
  },
  innerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 5,
  },
  headerTitle: {
    color: tintColor,
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 10
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textWraper: {
    position: 'relative',
    top: -70,
    padding: 20
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600'
  }
}

export default Profile;