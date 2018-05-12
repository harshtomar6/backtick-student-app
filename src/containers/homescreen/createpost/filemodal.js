import React,{ Component } from 'react'
import { 
View,
Text,
Modal,
Image,
Dimensions
 } from 'react-native'
class FileModal extends Component{
  render(){
    
    return( 
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width}}>
          <Image source={{uri:this.props.uri}} style={{width:'100%',height:'100%'}} resizeMode='cover'/>        
        </View>
      </Modal>
    )
    
    
    
  }
}
export default FileModal