import React,{ Component } from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
    Picker,
    Dimensions
} from 'react-native'
import _ from 'lodash'
import shortid from 'shortid'
import { Root,Container, Content, Footer,Input,Icon,ActionSheet,Button as NButton } from 'native-base';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'

//Local imports

import AvatarImg from '../../../img/avatar.jpeg'
import RnCamera from './rncamera'
import tintColor from '../../../globals'
import UploadList from './uploadlist'

var LEVEL = ["Class", "Department", "College"];
var TYPE = ["Notes", "Assignments", "Syllabus"];
class CreatePost extends Component{
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        let title = 'CreatePost'
        if(params){
            if(params.setHeader){
                return {
                    title,
                    headerTitleStyle: {
                        color: tintColor
                    },
                    headerRight: (
                        <TouchableOpacity style={{paddingRight:15,paddingLeft:10}}>
                            <Icon name='md-send'/>
                        </TouchableOpacity>
                      )
                  }
            }
            else{
                return {
                    title,
                    header:null,
                    tabBarVisible:false,
                    swipeEnabled: false
                }
            }
        }
        else{
            return {
                title,
                headerTitleStyle: {
                    color: tintColor
                },
                headerRight: (
                    <TouchableOpacity style={{paddingRight:15,paddingLeft:10}}>
                        <Icon name='md-send'/>
                    </TouchableOpacity>
                  )
              }
        }

      };
    constructor(props){
        super(props)
        this.state={
            level:LEVEL[0],
            type:'Notes',
            typeSelector:false,
            input:"",
            camera:false,
            count:0,
            attachments:[]
        }
        
        this.openCamera = this.openCamera.bind(this)
        this.addUrl = this.addUrl.bind(this)
        this.openImageLibrary = this.openImageLibrary.bind(this)
        
    
    }
    componentDidMount(){
        console.log(this.props.user);
        
    }
    componentWillUpdate(){
        console.log(this.state);
        
    }
    openCamera(){
        console.log("Open Camera is called");
        this.props.navigation.setParams({setHeader: false})
        this.setState({
            camera:true
        })
    }

    closeCamera(){
        this.props.navigation.setParams({setHeader: true})
        this.setState({
            camera:false
        })

    }
    openCameraVideo(){
        let options = {
            title: 'Select Avatar',
            customButtons: [
              {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images'
            },
            mediaType:'video'
          };
        ImagePicker.launchCamera(options, (response)  => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
              }
              else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              }
              else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              }
              else {
                let source = { uri: response.uri ,url:response.origURL};
            
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            
                console.log('source:',source);
                
              }
          });
    }
    openImageLibrary(){

        let options = {
            title: 'Select Avatar',
            customButtons: [
              {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };
        ImagePicker.launchImageLibrary(options, (response)  => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
              }
              else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              }
              else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              }
              else {
                let source = { uri: response.uri };
            
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.addUrl(response.type,response.fileName,response.uri)
                console.log('response:',response);
                
              }
          });
    }

    openImagePicker(){

        let options = {
            title: 'Select Avatar',
            customButtons: [
              {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };
        ImagePicker.showImagePicker(options, (response)  => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
              }
              else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              }
              else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              }
              else {
                let source = { uri: response.uri };
            
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.addUrl('image',response.uri)
                console.log('source:',source);
                
              }
          });
    }

    openDocumentPicker(){
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
          },(error,res) => {
            console.log(error)
            // Android
            if(res){
                this.addUrl(res.type,res.fileName,res.uri)
            }
            console.log(
               res
            );
          });
    }
    addUrl(type,fileName,url){

        console.log('addUrl is called')
        
        let id = shortid.generate()
        

        this.setState({
            attachments:[...this.state.attachments,
                {   
                    type,
                    url,
                    status:false,
                    id,
                    fileName,
                    uploadURL:''
                }
            ],
            count:this.state.count+1
        })
    }
    removeUrl(id){
        let newAttachments = this.state.attachments.filter(item=>{
            if(item.id === id){
                return false
            }
            else{
                return true
            }
        })

        this.setState({
            attachments:[...newAttachments],
            count:this.state.count-1
        })

    }
    changeStatus(id,status){
        this.state.attachments.map(item=>{
            if(item.id === id){
                item.status = status
            }

        })
    }

    setUpdateURL(id,uploadurl){
        this.state.attachments.map(item=>{
            if(item.id === id){
                item.uploadURL = uploadurl
            }

        })
    }
    render(){
        let photoURI = this.props.user.user.photoURL
        if(photoURI){
            if(photoURI.includes('graph.facebook.com')){
                photoURI = `${photoURI}?width=200`
            }
            else{
                photoURI = `https://ce8d52bcc.cloudimg.io/width/500/x/${photoURI}`
            }
        }

        if(this.state.camera){
            return <RnCamera back={this.closeCamera.bind(this)}  update={(url)=>this.addUrl('image/jpeg',null,url)}/>
        }else
        return(
            <Root>
            <Container>
                
                

                <Content>
                    
                    <View>
                        <View style={[styles.vertical,{padding:10,backgroundColor:'#fff'}]}>
                            <View style={styles.tumbnail}>
                                <Image source={photoURI === null?AvatarImg:{uri:photoURI}} style={{width:55,height:55,borderRadius:50}}/>
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.name}> 
                                    {this.props.user.user.name}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View style={[styles.vertical,{padding:10,backgroundColor:'#e8e8e8'}]}>
                                <TouchableOpacity 
                                    style={{margin:5,backgroundColor:'#7e97a8',paddingLeft:10,paddingRight:10,borderRadius:4,elevation:1}}
                                    onPress={() =>
                                        ActionSheet.show(
                                          {
                                            options: LEVEL,
                                            cancelButtonIndex:3,
                                            title: "Select Send Level"
                                          },
                                          buttonIndex => {
                                            if(buttonIndex !== 3){
                                                this.setState({ level: LEVEL[buttonIndex] });
                                            }
                                    
                                            
                                          }
                                          
                                        )}
                                      >
                                    
                                    <Text style={{color:'#fff',fontWeight:'800'}}>TO: {this.state.level}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{margin:5,backgroundColor:'#7e97a8',paddingLeft:10,paddingRight:10,borderRadius:4,elevation:1}}
                                    onPress={() =>
                                        ActionSheet.show(
                                          {
                                            options: TYPE,
                                            cancelButtonIndex:5,
                                            title: "Select Send Level"
                                          },
                                          buttonIndex => {
                                            if(buttonIndex !== 5){
                                                this.setState({ type: TYPE[buttonIndex] });
                                            }
                                    
                                            
                                          }
                                          
                                        )}
                                      >
                                    
                                    <Text style={{color:'#fff',fontWeight:'800'}}>TYPE: {this.state.type}</Text>
                                    
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.vertical,{padding:10,backgroundColor:'#f9f9f9'}]}>
                            <Input multiline={true} placeholder="What's on your mind?" value={this.state.input} onChangeText={text=>this.setState({input:text})}/>
                        </View>
                        <View>
                        
                            <UploadList changeStatus={this.changeStatus.bind(this)} removeUrl={this.removeUrl.bind(this)} setUpdateURL={this.setUpdateURL.bind(this)} attachments={this.state.attachments}/>
                        </View>
                    </View>
                </Content>
                <Footer style={{backgroundColor:'#fff'}}>
                    <View style={[styles.vertical,{backgroundColor:'#f5f5f5',flex:1,justifyContent:'space-around',alignItems:'center'}]}>
                        <TouchableOpacity 
                            onPress={this.openCamera.bind(this)}
                        >
                            <Icon name='md-camera' style={{color:'#749bbf'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.openImageLibrary}
                        >
                            <Icon name='md-image' style={{color:'#749bbf'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name='md-videocam' style={{color:'#749bbf'}}/>
                           
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openDocumentPicker.bind(this)}>
                           <Icon name='md-document' style={{color:'#749bbf'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                           <Icon name='md-link' style={{color:'#749bbf'}}/>
                        </TouchableOpacity>
                    </View>
                </Footer>
            </Container>
            </Root>
        )
    }
}

const styles = StyleSheet.create({
vertical:{
	flexDirection:'row'
},
name:{
	fontSize: 16,
    color: '#000',
    fontWeight:'500'
},
tumbnail:{

},
profileInfo:{
	padding:10
},
title: {
    
  },
})
const mapStateToProps = ({user})=>{
return {
	user
}
}
export default connect(mapStateToProps)(CreatePost)