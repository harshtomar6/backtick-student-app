import React,{ Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    Button,
    Image,
    CameraRoll,
    TouchableHighlight,
    PermissionsAndroid,
    Alert
} from 'react-native'
import _ from 'lodash'
import RnCamera from '../../helper/rncamera'
import { styles } from '../../../styles/'
import { Input ,Label,Item } from 'native-base';
import { getUser , SignOut,sendUpdateToServer,uploadToFirebase} from '../../../actions/'

class Init extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:null,
            name:'',
            phone:'',
            photoURI:'',
            getPhoto:false,
            readyToSend:true,
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
                    headerRight: (
                        <Button
                          onPress={() => SignOut()}
                          title="SignOut"
                          color="#000"
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
                headerRight: (
                    <Button
                      onPress={() => SignOut()}
                      title="SignOut"
                      color="#000"
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
        
        console.log(this.state);
        
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
            const domain = photoURI.substring(8).split('/')[0]
            if(domain === 'graph.facebook.com'){
                photoURI = `${photoURI}?width=999`
            }
            else{
                photoURI = `https://ce8d52bcc.cloudimg.io/width/500/x/${photoURI}`
            }
            return(
                <View>
                    <ScrollView>
                        <TouchableHighlight 
                            onPress={()=>this.requestReadAndWritePermission()}
                            style={styles.updateInfoAvatar}>
                            <Image source={{uri:this.state.photoURI===''?photoURI:this.state.photoURI}}  style={{width: 200, height: 200,borderRadius:200}} />
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
                    <View><Button disabled={this.state.readyToSend} onPress={this.onPressUpdate.bind(this)} title="UPDATE"/></View>
                </View>
            )
        }   
        else{
            return <View></View>
        }
    }
}



export default Init