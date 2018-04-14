import React,{ Component } from 'react'
import { Field , reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createUserWithEmailAndPassword } from '../../actions/'
import { GoogleSignin,GoogleSigninButton } from 'react-native-google-signin'
import {
    View,
    Image,
    TouchableHighlight
} from 'react-native'
import { Container, Header, Content, Form, Item, Input ,Label, Button, Text} from 'native-base';

import Logo from '../../img/logo.png'
//Styles
import { styles } from '../../styles/'
class SignUp extends Component{

    static navigationOptions = {
        title:'SignUp'
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
                    <Label>{field.label}</Label>
                    <Input secureTextEntry={secureEntryValue} {...field.input}/>
                </Item>
            </View >
        )
    }

    onSubmit(values){
        //handle on submit here
        console.log(values);
        createUserWithEmailAndPassword(values,this.onSuccess.bind(this),this.onFail.bind(this))
    }
    onSuccess(){
        this.props.navigation.navigate('VerifyEmail')
    }
    onFail(obj){
        alert(obj.error)
    }
    render(){
        
        const { handleSubmit } = this.props
        return(
            <View style={styles.authcontainer}>
                <View style={styles.authcontent}>
                    <View ref={ref=>this.imageView = ref} style={styles.logo}>
                        <Image 
                            
                            resizeMode='contain'
                            style= {styles.logoimg}
                            source={Logo}/>
                    </View>
                    <View  style={styles.login}>
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
                        <Button 
                            style={styles.btnLogin}
                            block primary 
                            onPress = { handleSubmit(this.onSubmit.bind(this))}>
                            <Text>CREATE ACCOUNT</Text>
                        </Button>
                    </View>
                    <TouchableHighlight  onPress={()=>this.props.navigation.navigate('SignUp')}>
                            <Text style={styles.text}>Terms and conditions</Text>
                        </TouchableHighlight>
                </View>
            </View>
        )
    }
}

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
        form:'SignUpForm'
    }
)(
    connect()(SignUp)
)