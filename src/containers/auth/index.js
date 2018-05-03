import React,{ Component } from 'react'
import { Field , reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { GoogleSignin,GoogleSigninButton } from 'react-native-google-signin'
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    Dimensions,
    TouchableHighlight,
    TouchableNativeFeedback,
    Alert,
    Modal,
    Animated,
    TouchableOpacity,
    Easing
    
} from 'react-native'
import { Container, Header, Content, Form, Item, Input ,Label, Text,Button } from 'native-base';
import Logo from '../../img/logo.png'
import Googlesignin from '../../img/googlesignin.png'
import Fbsignin from '../../img/fbsignin.png'
import Toast from '../../components/toast'
import { googleLogin, checkSignIn ,signInWithEmailAndPassword,facebookLogin} from '../../actions/'
class Auth extends Component{

    constructor(props){
        super(props)
        this.animatedValue=new Animated.Value(1)
    }   
    static navigationOptions = {
        title:'Auth',
        header:null
    }
    componentDidMount(){

        
        
    }
    renderInput(field){
        const {meta:{touched,error}} = field

        let hasError= false;
        let secureEntryValue = false
        if(error !== undefined){
        hasError= true;
        }

        if(field.type === "password") secureEntryValue = true
        return (
            <View >
                <Item 
                    style={styles.input}
                    error= {hasError} 
                    floatingLabel>
                    <Label style={styles.label}>{field.label}</Label>
                    <Input secureTextEntry={secureEntryValue} {...field.input}/>
                </Item>
                
            </View>
        )
    }

    onSubmit(values){
        //handle on submit here
        console.log(values);
        signInWithEmailAndPassword(values)
    }

    onFail(obj){

        console.error(obj)
        let title = ''
        let message = ""
        if(obj.from === 'googlesignin')
        {   
            title = "Google Signin"
            message = obj.Error.message
        }
        else if(obj.from === 'fbsignin'){
            title = "No Internet Connection"
            message = 'Please check your internet connection'
        }
            Alert.alert(
                title,
                message,
                [
                  {text: 'OK'},
                ],
                { cancelable: false }
              )
              
        
        
    }
    state = {
        modalVisible: false,
      };
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    showToast(){
        Animated.timing(
            this.animatedValue,
            {
                toValue:-100,
                duration:200
            }
        ).start()
    }

    hideToast(){
        Animated.timing(
            this.animatedValue,
            {
                toValue:0,
                duration:200
            }
        ).start()
    }
    render(){
        
        const { handleSubmit } = this.props
        return(
            <View  style={styles.authcontainer}>

                <View style={styles.authcontent}>
                    <View ref={ref=>this.imageView = ref} style={styles.logo}>
                        <Image 
                            
                            resizeMode='contain'
                            style= {styles.logoimg}
                            source={Logo}/>
                    </View>
                    <View style={styles.oauth}>
                            <TouchableNativeFeedback
                                onPress={()=>{
                                    
                                    googleLogin(this.onFail.bind(this))
                                }
                                }
                            >
                            <View style={[styles.oauthbtncontainer,{backgroundColor:'red'}]}>
                                <Text style={{color:'#fff'}}>Sign in with Google</Text>
                            </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress={()=>{
                                    
                                    facebookLogin(this.onFail.bind(this))
                                }
                                }
                            >
                            <View style={[styles.oauthbtncontainer,{backgroundColor:'#3b5998'}]}>
                                <Text style={{color:'#fff'}}>Sign in with Facebook</Text>
                            </View>
                            </TouchableNativeFeedback>
                        
                    </View>
                    <View style={styles.login}>
                        <View>
                            <Text style={styles.oauthtitle}>OR</Text>
                        </View>
                        <Field 
                            name="email"
                            label="Email"
                            type="email"
                            component={this.renderInput}
                        />
                        <Field 
                            name="password"
                            label="Password"
                            type="password"
                            component={this.renderInput}
                        />
                        <Button block primary 
                            style={styles.btnLogin}
                            onPress = { handleSubmit(this.onSubmit.bind(this))}>
                            <Text>Sign In</Text>
                        </Button>
                    </View>
                    <View style={styles.signupandreset}>
                        <TouchableHighlight  onPress={()=>this.props.navigation.navigate('ConfirmEmail')}>
                            <Text style={styles.text}>Forgot password?</Text>
                        </TouchableHighlight>
                        <TouchableHighlight  onPress={()=>this.props.navigation.navigate('SignUp')}>
                            <Text style={styles.text}>New here? Sign Up</Text>
                        </TouchableHighlight>
                    </View>

                </View>
               
            </View>
        )
    }
}


const styles=StyleSheet.create({
    authcontainer:{
        flex:1,
        flexDirection: 'column',
        backgroundColor:'rgb(226, 226, 226)',
        paddingRight:30,
        paddingLeft:30
    },
    input:{
        backgroundColor:'rgba(255, 255, 255,0.2)',
        padding:0
    },
    label:{
        paddingLeft:10
    },
    googlesigninbtn:{
        
        
    },
    authcontent:{

        flex:1,
        flexDirection: 'column',
    },
    login:{
        flex:4,
        paddingBottom:5
    },
    logo:{
        flex:4,
    },
    btnLogin:{
        marginTop:10,
        marginBottom:5,
        borderRadius:4,
        backgroundColor:'rgb(81, 198, 181)',
        zIndex:1
    },
    text:{
        fontSize:12
    },
    signupandreset:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    oauth:{
        flex:2,
    },
    oauthtitle:{
        color:'grey',
        textAlign:'center',
        marginBottom:4,
    },
    oauthbody:{
        flexDirection:'column',
        justifyContent:'space-around'
    },
    oauthbtncontainer:{
        height:50,
        marginBottom:5,
        borderRadius:50,
        elevation:2,
        justifyContent:'center',
        alignItems:'center'
    
    },
    logoimg:{
        width:Dimensions.get('window').width-60,
        
    }
})
function validate(values){
    const errors = {}
    if(!values.email){
        errors.eamil = "Enter valid email"
    }
    if(!values.password){
        errors.password = "Must be 8 char"
    }

    return errors
}

export default reduxForm(
    {
        validate,
        form:'LoginForm'
    }
)(
    connect()(Auth)
)