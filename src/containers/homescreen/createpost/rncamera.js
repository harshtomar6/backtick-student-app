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
            flashMode:RNCamera.Constants.FlashMode.off
        }
    }
    toggleFlashMode(){
        if(this.state.type === RNCamera.Constants.FlashMode.off){
            this.setState({
                flashMode:RNCamera.Constants.FlashMode.on
            })
        }
        else{
            this.setState({
                flashMode:RNCamera.Constants.FlashMode.off
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
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.toggleFlashMode.bind(this)}
            style = {styles.capture}
        >
            <Icon name='camera' style={{fontSize: 50,color:'white'}}/>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={this.toggleType.bind(this)}
            style = {styles.capture}
        >
            <Icon name='camera' style={{fontSize: 50,color:'white'}}/>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Icon name='camera' style={{fontSize: 50,color:'white'}}/>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>this.props.back()}
            style = {styles.capture}
        >
            <Icon name='camera' style={{fontSize: 50,color:'white'}}/>
        </TouchableOpacity>
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
    margin: 20
  }
});