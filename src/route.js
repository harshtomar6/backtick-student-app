import { StackNavigator , SwitchNavigator } from 'react-navigation'
import HomeScreen from './containers/homescreen/'
import AuthLoading from './containers/authloading'
import VerifyEmail from './containers/auth/verifyemail'
import VerifyCode from './containers/auth/forgotpassword/askcodeandpassword'
import ConfirmEmail from './containers/auth/forgotpassword/sendemail'
import SignUp from './containers/auth/signup'
import Auth from './containers/auth/'
export const SingedIn = StackNavigator(
    {
        Home:{
            screen:HomeScreen
        }
    },
    {
        initialRouteName:'Home'
    }
)
export const SingedOut = StackNavigator(
    {
        Auth:{
            screen:Auth
        },
        SignUp:{
            screen:SignUp
        },
        VerifyCode:{
            screen:VerifyCode
        },
        ConfirmEmail:{
            screen:ConfirmEmail
        }
    },
    {
        initialRouteName:'Auth'
    }
)
export const RootNavigator =  SwitchNavigator(
        {   
            AuthLoading:{
                screen:AuthLoading
            },
            SignedIn:{
                screen : SingedIn
            },
            SignedOut:{
                screen : SingedOut
            },
            VerifyEmail:{
                screen:VerifyEmail
            },
    
        },
        {
            initialRouteName:'AuthLoading'
        }
    )
 