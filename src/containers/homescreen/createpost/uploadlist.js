import React,{ Component } from 'react'
import _ from 'lodash'
import { 
View,
Text,
FlatList
 } from 'react-native'
 import {Icon} from 'native-base'
 import UploadImage from './uploadimage'
class UploadList extends Component{
  render(){
    if(_.isEmpty(this.props.attachments)){
      return(
        <View style={{marginTop:50,justifyContent:'center',alignItems:'center'}}>
          <Icon style={{color:'#bababa'}} name='ios-attach'/>
          <Text style={{color:'#bababa'}}>
           No attachments
          </Text>
        </View>
        )
    }
    else{
      return(
        <View>
          <FlatList
            data={this.props.attachments}
            renderItem = {({item})=>(
              <UploadImage id={item.id} url={item.url} status={item.status} setUpdateURL={this.props.setUpdateURL} changeStatus={this.props.changeStatus} />
            )}
              keyExtractor={item=>item.id}
          />
        </View>)
    }

  }
}
export default UploadList