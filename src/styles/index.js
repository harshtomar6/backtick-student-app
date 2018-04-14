
import { StyleSheet,Dimensions } from 'react-native'
export const styles=StyleSheet.create({
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
