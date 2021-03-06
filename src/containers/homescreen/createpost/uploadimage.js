import React,{ Component } from 'react'
import { 
View,
Text,
Image,
TouchableOpacity,
Dimensions
 } from 'react-native'

import { uploadToFirebase } from '../../../actions'
import {Icon} from 'native-base'
import PercentageCircle from 'react-native-percentage-circle'
class UploadImage extends Component{
  constructor(props){
    super(props)
    this.state = {
      percentage:0,
      uploadURL:'',
      firebaseRef:null,
      status:'uploading',
      
    }

    this.renderStatus = this.renderStatus.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('ID:',this.props.id);
    console.log('Previous State',this.state);
    console.log('Next State',nextState);
    return true
  }

  async componentDidMount(){
      console.log('componentDidMount');
      
      this.props.changeStatus(this.props.id,true)
      if(!this.props.status){
      let url = await uploadToFirebase(this.props.url,this.props.type,'post',this.setPercentage.bind(this),this.setFirebaseRef.bind(this))
        this.props.setUpdateURL(this.props.id,url)
        this.setState({
          uploadURL:url,
          status:'uploaded'
        })
      }else{
        this.setState({
          percentage:100,
          status:'uploaded'
        })
      }
  }
  setPercentage(val){
    console.log('Percentage:',val);
    this.setState({
      percentage:val
    })
  }
  setFirebaseRef(ref){
    this.setState({
      firebaseRef:ref
    })
  }

  async deleteUpload(){
    try{
      this.setState({
        status:'deleting'
      })
      let res = await this.state.firebaseRef.delete()
      this.setState({
        status:'deleted'
      })
      console.log('Deleted Successfully',res);
      this.props.removeUrl(this.props.id)
      
    }
    catch(err){
      console.log('Deleted Failed');
    }
  }
  componentDidUpdate(){

    
  }
  renderStatus(){
    if(this.state.status === 'uploading'){
      return(
        <View style={{position:'relative',flex:1,alignItems:'center',justifyContent:'center'}}>
          <PercentageCircle 
            radius={35} 
            percent={this.state.percentage} 
            bgcolor={'#00b6ff'} 
            innerColor={'#fff'} 
            borderWidth={3} 
            color={"#bababa"}
            >
            <Text>{parseInt(this.state.percentage)}</Text>
          </PercentageCircle> 
        </View>
      )
    }else if(this.state.status === 'uploaded'){
      return(
        <View style={{position:'absolute'}}>
          <TouchableOpacity onPress={this.deleteUpload.bind(this)} style={{backgroundColor:'white',borderRadius:50,opacity:0.5,margin:8,paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5}}>
            <Icon name='md-trash'/>
          </TouchableOpacity>
        </View>
      )
    }else if(this.state.status === 'deleting'){
      return(
        <View style={{position:'relative',flex:1,alignItems:'center',justifyContent:'center'}}>
          <View style={{backgroundColor:'#fff',borderRadius:50,padding:25}}>
            
            <Text>DELETING...</Text>
          </View>
        </View>
      )
    }
  }
  render(){
    return(
      <View>
        <TouchableOpacity activeOpacity={0.8} style={{flex: 1,height: 250}}
                  >
                  <Image source={{uri:this.props.url}} 
                    style={{height:'100%',width: '100%'}} resizeMode="cover"/>
                </TouchableOpacity>
        
        <View style={{position:'absolute',display:'flex',height: '100%', width: '100%'}}>
          
          
          {this.renderStatus()}
          
        </View> 
      </View>
    )
  }
}
export default UploadImage