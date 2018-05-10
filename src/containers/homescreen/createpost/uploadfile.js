import React,{ Component } from 'react'
import { 
View,
Text,
Image,
TouchableOpacity,
Dimensions,
StyleSheet
 } from 'react-native'
import {Icon} from 'native-base'
import PercentageCircle from 'react-native-percentage-circle'

//local uploads
import { uploadToFirebase } from '../../../actions'
import PdfImg from '../../../img/pdf.png'
import DocImg from '../../../img/doc.png'
class UploadFile extends Component{
  constructor(props){
    super(props)
    this.state = {
      percentage:0,
      uploadURL:'',
      firebaseRef:null,
      status:'uploading'
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
      this.props.changeStatus(this.props.id,true)
      if(!this.props.status){
      let url = await uploadToFirebase(this.props.url,this.props.type ,'post',this.setPercentage.bind(this),this.setFirebaseRef.bind(this))
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
          <PercentageCircle radius={35} percent={this.state.percentage} bgcolor={'#00b6ff'} innerColor={'#fff'} borderWidth={3} color={"#bababa"}>
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
    } else if(this.state.status === 'deleting'){
      return(
        <View style={{position:'relative',flex:1,alignItems:'center',justifyContent:'center'}}>
          <View style={{backgroundColor:'#fff',borderRadius:50,padding:25}}>
            
            <Text>DELETING...</Text>
          </View>
        </View>
      )
    }
  }

  renderInital(){
    let img = 'file'
    switch(this.props.type){
      case "application/pdf": 
        img = PdfImg
        break
      case "application/msword": 
        img = DocImg
        break
    }

    return(
      <View>
        <TouchableOpacity activeOpacity={0.8} style={styles.fileContainer}
                  >
          <View >
            <Image source={img} 
              style={{height:80,width: 80}} resizeMode="cover"/>
            <View>
            </View>
          </View>
        </TouchableOpacity>
        
        <View style={{position:'absolute',display:'flex',height: '100%', width: '100%'}}>
          
          
          {this.renderStatus()}
          
        </View> 
      </View>
    )
    
  }
  render(){
    return this.renderInital()
    
  }
}

const styles = StyleSheet.create({
  fileContainer:{
    flex: 1,
    height: 120,
    backgroundColor:'grey',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:4
  }
})
export default UploadFile