import React, { Component } from 'react'
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	Image,
	StyleSheet,
	FlatList,
	Picker,
	Dimensions
} from 'react-native'
import _ from 'lodash'
import shortid from 'shortid'
import { Root, Container, Content, Footer, Input, Icon, ActionSheet,
		 Button as NButton } from 'native-base';
import RnCamera from './rncamera'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import { tintColor } from '../../../globals'
import UploadList from './uploadlist'

var LEVEL = ["Class", "Department", "College"];
var TYPE = ["Notes", "Assignments", "Syllabus"];
class CreatePost extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;
		let title = 'New Post'
		if (params) {
			if (params.setHeader) {
				return {
					title,
					headerRight: (
						<NButton style={{ height: '100%', paddingHorizontal: 5 }} transparent>
							<Icon name='md-send' style={{ color: tintColor }} />
						</NButton>
					)
				}
			}
			else {
				return {
					title,
					header: null,
					tabBarVisible: false,
					swipeEnabled: false
				}
			}
		}
		else {
			return {
				title,
				headerRight: (
					<NButton style={{ height: '100%', paddingHorizontal: 5 }} transparent>
						<Icon name='md-send' style={{ color: tintColor }} />
					</NButton>
				)
			}
		}

	};
	constructor(props) {
		super(props)
		this.state = {
			level: LEVEL[0],
			type: 'Notes',
			typeSelector: false,
			input: "",
			camera: false,
			count: 0,
			attachments: []
		}

		this.openCamera = this.openCamera.bind(this)
		this.addUrl = this.addUrl.bind(this)
		this.openImageLibrary = this.openImageLibrary.bind(this)


	}
	componentDidMount() {
		console.log(this.props.user);

	}
	componentWillUpdate() {
		console.log(this.state);

	}
	openCamera() {
		console.log("Open Camera is called");
		this.props.navigation.setParams({ setHeader: false })
		this.setState({
			camera: true
		})
	}

	closeCamera() {
		this.props.navigation.setParams({ setHeader: true })
		this.setState({
			camera: false
		})

	}
	openCameraVideo() {
		let options = {
			title: 'Select Avatar',
			customButtons: [
				{ name: 'fb', title: 'Choose Photo from Facebook' },
			],
			storageOptions: {
				skipBackup: true,
				path: 'images'
			},
			mediaType: 'video'
		};
		ImagePicker.launchCamera(options, (response) => {
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
				let source = { uri: response.uri, url: response.origURL };

				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };

				console.log('source:', source);

			}
		});
	}
	openImageLibrary() {

		let options = {
			title: 'Select Avatar',
			customButtons: [
				{ name: 'fb', title: 'Choose Photo from Facebook' },
			],
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		ImagePicker.launchImageLibrary(options, (response) => {
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
				this.addUrl('image', response.uri)
				console.log('source:', source);

			}
		});
	}

	openImagePicker() {

		let options = {
			title: 'Select Avatar',
			customButtons: [
				{ name: 'fb', title: 'Choose Photo from Facebook' },
			],
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		ImagePicker.showImagePicker(options, (response) => {
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
				this.addUrl('image', response.uri)
				console.log('source:', source);

			}
		});
	}
	addUrl(type, url) {

		console.log('addUrl is called')

		let id = shortid.generate()


		this.setState({
			attachments: [...this.state.attachments,
			{
				type,
				url,
				status: false,
				id,
				uploadURL: ''
			}
			],
			count: this.state.count + 1
		})
	}

	changeStatus(id, status) {
		this.state.attachments.map(item => {
			if (item.id === id) {
				item.status = status
			}

		})
	}

	setUpdateURL(id, uploadurl) {
		this.state.attachments.map(item => {
			if (item.id === id) {
				item.uploadURL = uploadurl
			}

		})
	}
	render() {
		let photoURI = this.props.user.user.photoURL
		const domain = photoURI.substring(8).split('/')[0]
		if (domain === 'graph.facebook.com') {
			photoURI = `${photoURI}?width=200`
		}
		else {
			photoURI = `https://ce8d52bcc.cloudimg.io/width/500/x/${photoURI}`
		}

		if (this.state.camera) {
			return <RnCamera back={this.closeCamera.bind(this)} update={(url) => this.addUrl('image', url)} />
		} else
			return (
				<Root>
					<Container>
						<Content>

							<View>
								<View style={[styles.vertical, { padding: 10, backgroundColor: '#fff' }]}>
									<Image source={{ uri: photoURI }} 
										style={{ width: 50, height: 50, borderRadius: 50, marginRight: 20 }} />
									<View style={styles.profileInfo}>
										<Text style={styles.name}>
											{this.props.user.user.name}
										</Text>
									</View>
								</View>
								<View>
									<View style={[styles.vertical, { padding: 10, backgroundColor: '#fff' }]}>
										<TouchableOpacity
											style={{ margin: 5, backgroundColor: tintColor, 
												paddingVertical: 5, paddingHorizontal: 10, 
												borderRadius: 4, elevation: 1 }}
											onPress={() =>
												this.actionSheet._root.showActionSheet(
													{
														options: LEVEL,
														cancelButtonIndex: 3,
														title: "Select Send Level"
													},
													buttonIndex => {
														if (buttonIndex !== 3) {
															this.setState({ level: LEVEL[buttonIndex] });
														}
													}
												)}>
											<Text style={{ color: '#fff', fontWeight: '800' }}>TO: {this.state.level}</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={{ margin: 5, backgroundColor: tintColor, paddingVertical: 5, 
												paddingHorizontal: 10, borderRadius: 4, elevation: 1 }}
											onPress={() =>
												this.actionSheet._root.showActionSheet(
													{
														options: TYPE,
														cancelButtonIndex: 5,
														title: "Select Post Type"
													},
													buttonIndex => {
														if (buttonIndex !== 5) {
															this.setState({ type: TYPE[buttonIndex] });
														}
													}
												)}>
											<Text style={{ color: '#fff', fontWeight: '800' }}>Type: {this.state.type}</Text>
										</TouchableOpacity>
									</View>
								</View>
								<View style={[styles.vertical, { padding: 10, backgroundColor: '#f9f9f9' }]}>
									<Input multiline={true} placeholder="What's on your mind?" value={this.state.input}
										 onChangeText={text => this.setState({ input: text })} />
								</View>
								<View>
									<UploadList changeStatus={this.changeStatus.bind(this)} 
										setUpdateURL={this.setUpdateURL.bind(this)} 
										attachments={this.state.attachments} />
								</View>
							</View>
						</Content>
						<Footer style={{ backgroundColor: '#fff' }}>
							<View style={[styles.vertical, { backgroundColor: '#f5f5f5', 
								flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
								<NButton transparent style={{ height: '100%', flex: 1, justifyContent: 'center' }}
									onPress={this.openCamera.bind(this)}>
									<Icon name='md-camera' style={{ color: '#749bbf', fontSize: 24 }} />
								</NButton>
								<NButton transparent style={{ height: '100%', flex: 1, justifyContent: 'center' }}
									onPress={this.openImageLibrary}>
									<Icon name='md-image' style={{ color: '#749bbf', fontSize: 24 }} />
								</NButton>
								<NButton transparent style={{ height: '100%', flex: 1, justifyContent: 'center' }}>
									<Icon name='md-videocam' style={{ color: '#749bbf', fontSize: 24 }} />
								</NButton>
								<NButton transparent style={{ height: '100%', flex: 1, justifyContent: 'center' }}>
									<Icon name='md-document' style={{ color: '#749bbf', fontSize: 24 }} />
								</NButton>
								<NButton transparent style={{ height: '100%', flex: 1, justifyContent: 'center' }}>
									<Icon name='md-link' style={{ color: '#749bbf', fontSize: 24 }} />
								</NButton>
							</View>
						</Footer>
						<ActionSheet ref={(c) => { this.actionSheet = c; }} />
					</Container>
				</Root>
			)
	}
}

const styles = StyleSheet.create({
	vertical: {
		flexDirection: 'row'
	},
	name: {
		fontSize: 16,
		color: '#000',
		fontWeight: '500',
		marginTop: 5
	},
	profileInfo: {
	},
	title: {

	},
})
const mapStateToProps = ({ user }) => {
	return {
		user
	}
}
export default connect(mapStateToProps)(CreatePost)