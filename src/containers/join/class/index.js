import React,{ Component } from 'react'
import { 
View,
Text,
Button
 } from 'react-native'

 import {
     Item,
     Input
 } from 'native-base'
import { connect } from 'react-redux'
 import {SignOut,getUser,joinClassToServer} from '../../../actions/'
 import RnCameraQr from '../../helper/rncameraqr'
class JoinClass extends Component{
    constructor(props){
        super(props)
        this.state={
            getCamera:false,
            code:'',
            user:null,
            token:'',
            key:''
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        let title = 'Join Class'
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
        this.setState({token:user.data.token,key:user.data.key,user:user.data.user})
    }
    openCamera(){
        console.log("Open Camera is called");
        this.props.navigation.setParams({setHeader: false})
        this.setState({
            getCamera:true
        })
        

    }
    closeCamera(){
        this.props.navigation.setParams({setHeader: true})
        this.setState({
            getCamera:false
        })

    }

    updateCode(code){
        this.setState({code})
    }

    async onPressJoin(){
        console.log(this.state);
        
        joinClassToServer(this.state)
    }

    render(){
        if(this.state.getCamera){
            return <RnCameraQr back={this.closeCamera.bind(this)} update={this.updateCode.bind(this)}/>
        }
        else{
            return(
            <View>
                <View><Text>Join Class</Text></View>
                <View>
                    <Item>
                        <Input placeholder='CLASS CODE' value={this.state.code}/>
                    </Item>
                    <Button title='Scan' onPress={this.openCamera.bind(this)}/>
                    <Item>
                        <Input placeholder='REG NO (eg USN)'/>
                    </Item>
                </View>
                <View>
                <Button title='JOIN' onPress={this.onPressJoin.bind(this)}/>
                </View>
            </View>)
        }
    }
}


export default JoinClass