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
      uploadURL:''
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
      let url = await uploadToFirebase(this.props.url,'image/jpeg','post',this.setPercentage.bind(this))
        this.props.setUpdateURL(this.props.id,url)
        this.setState({
        uploadURL:url
        })
      }else{
        this.setState({
          percentage:100
        })
      }
  }
  setPercentage(val){
    console.log('Percentage:',val);
    this.setState({
      percentage:val
    })
  }

  componentDidUpdate(){

    
  }
  renderStatus(){
    if(this.state.percentage < 99){
      return(
        <View style={{position:'relative',flex:1,alignItems:'center',justifyContent:'center'}}>
        <PercentageCircle radius={35} percent={this.state.percentage} bgcolor={'#00b6ff'} innerColor={'#fff'} borderWidth={3} color={"#bababa"}>
          <Icon name='md-image'/>
        </PercentageCircle> 
        </View>
      )
    }else{
      return(
        <View style={{position:'absolute'}}>
          <View style={{backgroundColor:'white',borderRadius:50,opacity:0.5,margin:4,paddingLeft:10,paddingRight:10}}>
            <Text>DONE</Text>
          </View>
        </View>
      )
    }
  }
  render(){
    return(
      <View>
        <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}
                  >
                  <Image source={{uri:this.props.url}} 
                    style={{height: 250, width: Dimensions.get('window').width}} resizeMode="cover"/>
                </TouchableOpacity>
        
        <View style={{position:'absolute',display:'flex',height: 250, width: Dimensions.get('window').width}}>
          
          
          {this.renderStatus()}
          
        </View> 
      </View>
    )
  }
}
export default UploadImage