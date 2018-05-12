import React, { Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal,
  ScrollView, Dimensions, Text } from 'react-native';
import { getImageURI } from './../../../../globals';
import pdf from './../../../../img/pdf.png';
import doc from './../../../../img/doc.png';
import txt from './../../../../img/txt.png';

export default class Attachment extends React.Component {
  constructor(){
    super();
    this.state = {
      modalVisible: false,
      fullImage: ''
    };
  }

  getAttachments = () => {
    switch(this.props.attachments.length){
      case 0:
        return <Fragment />
      case 1:
      case 2:
        return this.props.attachments.map((attachment, index) => 
            this.mapAttachment(attachment, index)
          );
      case 3:
        let firstImage = this.mapAttachment(this.props.attachments[0], 0);
        return (
          <Fragment>
            <View style={{flex: 1}}>
              {firstImage}  
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
              {this.mapAttachment(this.props.attachments[1], 1)}
              {this.mapAttachment(this.props.attachments[2], 2)}
            </View>
          </Fragment>
        )
      case 4:
        return (
          <Fragment>
            <View style={{flex: 1}}>
              {this.mapAttachment(this.props.attachments[0], 0)}
              {this.mapAttachment(this.props.attachments[2], 2)}
            </View>
            <View style={{flex: 1}}>
              {this.mapAttachment(this.props.attachments[1], 1)}
              {this.mapAttachment(this.props.attachments[3], 3)}
            </View>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <View style={{flex: 1}}>
              {this.mapAttachment(this.props.attachments[0], 0)}
              {this.mapAttachment(this.props.attachments[2], 2)}
            </View>
            <View style={{flex: 1}}>
              {this.mapAttachment(this.props.attachments[1], 1)}
              <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}
                onPress={() => this.handleImageTouch(true, this.props.attachments[3].url, 3)}>
                <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                  borderWidth: 2, borderRadius: 2, borderColor: '#ccc', backgroundColor: 'rgba(0,0,0,0.1)'}}>
                  <Text style={{color: '#666', fontWeight: '500'}}>+ {this.props.attachments.length - 3}&nbsp;
                   More</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Fragment>
        );
    }
  }

  mapAttachment = (attachment, index) => {
    if(attachment.type.includes('image')){
      return (
        <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}
          onPress={() => this.handleImageTouch(true, attachment.url, index)}>
          <Image source={{uri: getImageURI(attachment.uploadURL)}} 
            style={{width: '100%', height: '100%', borderWidth: 2, borderRadius: 2, borderColor: '#ccc'}} 
            resizeMode="cover"/>
        </TouchableOpacity>
      );
    }
    else if(attachment.type.includes('application')){
      let docType = attachment.type.split('/')[1];
      return (
        <View style={styles.docStyles}>
          <Image source={this.getDocImage(docType)} style={{width: 50, height: 50}}/>
          <Text>{attachment.fileName}</Text>
        </View>
      );
    }
    else
      return <View />
  }

  getDocImage = (type) => {
    switch(type){
      case 'pdf':
        return pdf;
      case 'doc':
        return doc
      default:
        return txt
    }
  }

  handleImageTouch = (visible, imageUrl, active) => {
    this.setState({modalVisible: visible, fullImage: imageUrl}, () => {
      setTimeout(() => {
        this.scrollView.scrollTo({x: active*Dimensions.get('window').width, y:0, animated: false})
      }, 10)
    });
  }

  render(){
    return (
      <Fragment>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: !this.state.modalVisible, fullImage: ''});
          }}>
          <ScrollView horizontal pagingEnabled ref={e => this.scrollView = e}
            horizontalScrollIndicator={false}>
            {this.props.attachments.map(attachment =>
                <Image source={{uri: getImageURI(attachment.uploadURL)}} 
                  style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}
                  resizeMode='contain'/> 
            )}
          </ScrollView>
        </Modal>

        <View 
        style={[styles.attachMents, 
          {
            height: this.props.attachments.length > 0 ? 250 : 0,
            paddingTop: this.props.attachments.length > 0 ? 15 : 0,
            paddingBottom: this.props.attachments.length > 0 ? 10 : 0 
          }]}>
          {this.getAttachments()}      
      </View>
      </Fragment>
    );
  }
}

const styles={
  attachMents: {
    height: 250,
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  docStyles: {
    flexDirection: 'row'
  } 
}

Attachment.defaultProps = {
  attachments: []
}