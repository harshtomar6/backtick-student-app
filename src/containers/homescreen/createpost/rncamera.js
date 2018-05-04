import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import { Icon } from 'native-base'
import {uploadToFirebase} from '../../../actions/index'
export default class RnCamera extends Component {

    constructor(props){
        super(props)
        this.state={
            type:RNCamera.Constants.Type.back,
            iconflash:'ios-flash-outline',
            flashMode:RNCamera.Constants.FlashMode.off
        }
    }
    toggleFlashMode(){
        if(this.state.type === RNCamera.Constants.FlashMode.off){
            this.setState({
                flashMode:RNCamera.Constants.FlashMode.on,
                iconflash:'ios-flash',
            })
        }
        else{
            this.setState({
                flashMode:RNCamera.Constants.FlashMode.off,
                iconflash:'ios-flash-outline',
            })
        }
    }
    toggleType(){
        if(this.state.type === RNCamera.Constants.Type.back){
            this.setState({
                type:RNCamera.Constants.Type.front
            })
        }
        else{
            this.setState({
                type:RNCamera.Constants.Type.back
            })
        }
    }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            style = {styles.preview}
            type={this.state.type}
            flashMode={this.state.flashMode}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0,position:'absolute',display:'flex',flexDirection: 'column'}}>
          <View style={{flex:4}}>
            <Text>Hello</Text>
          </View>
          <View style={{flex:1,flexDirection: 'row',top:Dimensions.get("window").height-185,padding:20}}>
          <View style={{}}>
            <TouchableOpacity
                onPress={this.toggleFlashMode.bind(this)}
                style = {styles.capture}
            >
                <Icon name={this.state.iconflash} style={{fontSize: 30,color:'white'}}/>
            </TouchableOpacity>
              <TouchableOpacity
                onPress={this.toggleType.bind(this)}
                style = {styles.capture}
              >
                <Icon name='ios-reverse-camera' style={{fontSize: 30,color:'white'}}/>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <TouchableOpacity  style = {styles.capture}>
              <Icon name='ios-image' style={{fontSize: 30,color:'white'}}/>
            </TouchableOpacity>
            <TouchableOpacity  style = {styles.capture}>
              <Icon name='ios-images' style={{fontSize: 30,color:'white'}}/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style = {styles.capture}
          >
              <Icon name='camera' style={{fontSize: 60,color:'red'}}/>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={()=>this.props.back()}
              style = {styles.capture}
          >
              <Icon name='ios-close' style={{fontSize: 30,color:'white'}}/>
          </TouchableOpacity>
          </View>
          </View>
      </View>
    );
  }

takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.18, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
      this.props.update(data.uri)
      this.props.back()
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 5
  }
});