import React,{ Component } from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList
} from 'react-native'
import _ from 'lodash'
import shortid from 'shortid'
import { Container, Content, Footer,Input,Icon } from 'native-base';
import RnCamera from './rncamera'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import tintColor from '../../../globals'
import UploadList from './uploadlist'

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
                    }
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
                }
              }
        }

      };
    constructor(props){
        super(props)
        this.state={
            to:'class',
            type:'normal',
            input:"",
            camera:false,
            count:0,
            attachments:[]
        }
        
        this.openCamera = this.openCamera.bind(this)
        this.addUrl = this.addUrl.bind(this)
        
    
    }
    componentDidMount(){
        console.log(this.props.user);
        
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
            
                console.log('source:',source);
                
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
            
                console.log('source:',source);
                
              }
          });
    }
    addUrl(type,url){

        let id = shortid.generate()
        

        this.setState({
            attachments:[...this.state.attachments,
                {   
                    type,
                    url,
                    status:false,
                    id,
                    uploadURL:''
                }
            ],
            count:this.state.count+1
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
        const domain = photoURI.substring(8).split('/')[0]
        if(domain === 'graph.facebook.com'){
            photoURI = `${photoURI}?width=200`
        }
        else{
            photoURI = `https://ce8d52bcc.cloudimg.io/width/500/x/${photoURI}`
        }

        if(this.state.camera){
            return <RnCamera back={this.closeCamera.bind(this)}  update={(url)=>this.addUrl('image',url)}/>
        }else
        return(
            <Container>
                <Content>
                    
                    <View>
                        <View style={[styles.vertical,{padding:10}]}>
                            <View style={styles.tumbnail}>
                                <Image source={{uri:photoURI}} style={{width:55,height:55,borderRadius:50}}/>
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.name}> 
                                    {this.props.user.user.name}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View style={[styles.vertical,{padding:10}]}>
                                <TouchableOpacity style={{marginLeft:10,padding:5,paddingLeft:10,paddingRight:10,borderWidth:2,borderRadius:10}}>
                                    <Text>TO:{this.state.to}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft:10,padding:5,paddingLeft:10,paddingRight:10,borderWidth:2,borderRadius:10}}>
                                    <Text>TYPE:{this.state.type}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.vertical,{padding:10}]}>
                            <Input placeholder="What's on your mind?" value={this.state.input} onChangeText={text=>this.setState({input:text})}/>
                        </View>
                        <View>
                            
                            <UploadList changeStatus={this.changeStatus.bind(this)} setUpdateURL={this.setUpdateURL.bind(this)} attachments={this.state.attachments}/>
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
                            onPress={this.openImageLibrary.bind(this)}
                        >
                            <Icon name='md-image' style={{color:'#749bbf'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name='md-videocam' style={{color:'#749bbf'}}/>
                           
                        </TouchableOpacity>
                        <TouchableOpacity>
                           <Icon name='md-document' style={{color:'#749bbf'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                           <Icon name='md-link' style={{color:'#749bbf'}}/>
                        </TouchableOpacity>
                    </View>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
vertical:{
	flexDirection:'row'
},
name:{
	fontWeight:'800'
},
tumbnail:{

},
profileInfo:{
	padding:10
}
})
const mapStateToProps = ({user})=>{
return {
	user
}
}
export default connect(mapStateToProps)(CreatePost)