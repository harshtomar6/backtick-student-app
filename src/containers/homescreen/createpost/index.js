import React,{ Component } from 'react'
import {
View,
Text,
Button,
TouchableOpacity,
Image,
StyleSheet
} from 'react-native'
import { Container, Content, Footer,Input } from 'native-base';
import { connect } from 'react-redux'
class CreatePost extends Component{
static navigationOptions = {
	title:'CreatePost',

}
constructor(props){
	super(props)
	this.state={
			to:'class',
			type:'normal',
			input:""
	}

}
componentDidMount(){
	console.log(this.props.user);
	
}
render(){
	return(
		<Container>
			<Content>
				
				<View>
					<View style={[styles.vertical,{padding:10}]}>
						<View style={styles.tumbnail}>
							<Image source={{uri:'https://graph.facebook.com/1746664335354802/picture?width=200'}} style={{width:55,height:55,borderRadius:50}}/>
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
				</View>
		</Content>
		<Footer style={{backgroundColor:'#fff'}}>
				<View style={[styles.vertical,{backgroundColor:'yellow',flex:1,justifyContent:'space-around',alignItems:'center'}]}>
					<TouchableOpacity>
						<Text>Photo</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>Video</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>Doc</Text>
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