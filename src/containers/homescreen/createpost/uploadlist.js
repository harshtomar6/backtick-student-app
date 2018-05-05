import React,{ Component } from 'react'
import { 
View,
Text,
FlatList
 } from 'react-native'
 import UploadImage from './uploadimage'
class UploadList extends Component{
  render(){
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
export default UploadList