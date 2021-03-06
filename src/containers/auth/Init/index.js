import React,{ Component } from 'react'
import {
    View,
    ScrollView,
    Image,
    CameraRoll,
    TouchableHighlight,
    PermissionsAndroid,
    Alert,
    Button, Text, StatusBar,
    TouchableNativeFeedback
} from 'react-native'
import _ from 'lodash'
import AvatarImg from '../../../img/avatar.jpeg'
import RnCamera from '../../helper/rncamera'
import { styles } from '../../../styles/'
import { Input ,Label,Item, Container} from 'native-base';
import { getUser , SignOut,sendUpdateToServer,uploadToFirebase} from '../../../actions/'
import { tintColor } from '../../../globals';

class Init extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:null,
            name:'',
            phone:'',
            photoURI:'',
            getPhoto:false,
            readyToSend:false,
            token:'',
            key:''
        }

        
        this.onChangeValidate = this.onChangeValidate.bind(this)
        this.openCamera = this.openCamera.bind(this)
    }
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        let title = 'Init'
        if(params){
            if(params.setHeader){
                return {
                    title,
                    headerTitleStyle: {
                        color: tintColor
                    },
                    headerRight: (
                        <Button
                          onPress={() => SignOut()}
                          color={tintColor}
                          title="SignOut"
                        />
                      )
                  }
            }
            else{
                return {
                    title,
                    header:null
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
                    <Button
                      onPress={() => SignOut()}
                      title="SignOut"
                      color={tintColor}
                    />
                  )
              }
        }

      };

    async componentDidMount(){
        
        const user = await getUser()
        console.log(user.data.user);
        
        this.setState({token:user.data.token,key:user.data.key,user:user.data.user,name:user.data.user.name})
        
    }

    async getImageFormGallery(){
       CameraRoll.getPhotos({first:1000})
        .then(res=>{
            console.log(res);
            
        })

    }

    componentDidUpdate(prevState){
        console.log('Component Will Update');
        
        this.onChangeValidate(prevState)
    }

    onChangeValidate(prevState){
        console.log(this.state);
      
        if(this.state.name !== ''){
            
            if(this.state.phone !== ''){
           
                if(this.state.readyToSend === true)
                this.setState({readyToSend:false})
            }
            else{
                if(this.state.readyToSend === false)
                this.setState({readyToSend:true})
            }
        }
        else{

            if(this.state.readyToSend === false)
            this.setState({readyToSend:true})
        }

        
    

        
    }

    async onPressUpdate(){
        if(this.state.photoURI !== ''){
            let url = await uploadToFirebase(this.state.photoURI,'image/jpeg','img')
            console.log(url);
            this.state.photoURI = url
        }
        else{
            this.state.photoURI = this.state.user.photoURL
        }
        
        sendUpdateToServer(this.state)
    }

    async  requestReadAndWritePermission() {
        try {
          const grantedRead = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              'title': 'BackTick needs to access external storage',
              'message': 'Cool Photo App needs access to your camera ' +
                         'so you can take awesome pictures.'
            }
          )
          if (grantedRead === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Read External is Granted")

            try {
                const grantedWrite = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                  {
                    'title': 'BackTick needs to access external storage',
                    'message': 'Cool Photo App needs access to your camera ' +
                               'so you can take awesome pictures.'
                  }
                )
                if (grantedWrite === PermissionsAndroid.RESULTS.GRANTED) {
                  console.log("Write External is Granted")
                  this.openCamera()
                } else {
                  console.log("Camera permission denied")
                  return false;
                }
              } catch (err) {
                console.warn(err)
              }

            
          } else {
            console.log("Camera permission denied")
            return false;
          }
        } catch (err) {
          console.warn(err)
        }
      }


    openCamera(){
        console.log("Open Camera is called");
        this.props.navigation.setParams({setHeader: false})
        this.setState({
            getPhoto:true
        })
        

    }

    updatePhotoURI(uri){
        this.setState({
            photoURI:uri
        })
    }
    closeCamera(){
        this.props.navigation.setParams({setHeader: true})
        this.setState({
            getPhoto:false
        })

    }
    render(){
        if(this.state.getPhoto){
            return <RnCamera back={this.closeCamera.bind(this)} update={this.updatePhotoURI.bind(this)}/>
        }
        if(this.state.user !== null)
        {   const photoURI = this.state.user.photoURL
            if(photoURI){
                if(photoURI.includes('graph.facebook.com')){
                    photoURI = `${photoURI}?width=999`
                }
                else{
                    photoURI = `https://ce8d52bcc.cloudimg.io/width/500/x/${photoURI}`
                }
            }
            
            return(
                <Container style={{backgroundColor: '#fff', flex: 1}}>
                    <StatusBar backgroundColor={tintColor}/>
                    <ScrollView>
                        <TouchableHighlight 
                            onPress={()=>this.requestReadAndWritePermission()}
                            style={styles.updateInfoAvatar}>
                            <Image source={photoURI === null?AvatarImg:{uri:this.state.photoURI===''?photoURI:this.state.photoURI}}  style={{width: 200, height: 200,borderRadius:200}} />
                        </TouchableHighlight>
                        <Item style={styles.input}>
                        <Input  placeholder={'email'} value={this.state.user.email}/> 
                        </Item>
                        <Item style={styles.input}>
                        <Input 
                            placeholder={'Name'} 
                            onChangeText={(e)=>{
                            this.setState({
                                name:e
                                })
                            }} 
                            value={this.state.name}/>
                        </Item>
                        <Input keyboardType='numeric' placeholder={'Phone No'} value={this.state.phone} onChangeText={e=>this.setState({phone:e})}/>
                    </ScrollView>
                    <TouchableNativeFeedback disabled={this.state.readyToSend}
                        onPress={this.onPressUpdate.bind(this)}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{width: '100%', 
                        backgroundColor: this.state.readyToSend ? '#999' : tintColor, 
                        alignItems: 'center', padding: 14}}>
                        <Text style={{color: '#fff'}}>UPDATE</Text>
                    </View>
                    </TouchableNativeFeedback>
                </Container>
            )
        }   
        else{
            return <View></View>
        }
    }
}



export default Init