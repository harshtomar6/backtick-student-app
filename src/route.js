import { StackNavigator , SwitchNavigator, TabNavigator,TabBarBottom  } from 'react-navigation'
//HomeScreen  imports
import HomeScreen from './containers/homescreen/'
import CreatePost from './containers/homescreen/createpost/'
import Bulletin from './containers/homescreen/bulletin/'
import Notification from './containers/homescreen/notification/'
import Save from './containers/homescreen/save/'

//Joins
import JoinClass from './containers/join/class'
//Auth imports
import UpdateInfo from './containers/auth/Init/updateinfo/'
import Init from './containers/auth/Init/'
import AuthLoading from './containers/authloading'
import VerifyEmail from './containers/auth/verifyemail'
import VerifyCode from './containers/auth/forgotpassword/askcodeandpassword'
import ConfirmEmail from './containers/auth/forgotpassword/sendemail'
import SignUp from './containers/auth/signup'
import Auth from './containers/auth/'

export const Home = TabNavigator(
    {
        CreatePost:{
            screen:CreatePost
        },
        Bulletin:{
            screen:Bulletin
        },
        Notification:{
            screen:Notification
        },
        Schedules:{
            screen:Bulletin
        },
        Star:{
            screen:Save
        },

    },
    {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'CreatePost') {
              iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            } else if (routeName === 'Bulletin') {
              iconName = `ios-options${focused ? '' : '-outline'}`;
            }
    
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <View><Text>{iconName}</Text></View>;
          },
          tabStyle :{
              width:50
          }
        }),
        tabBarOptions: {
          activeTintColor: '#42b9f4',
          inactiveTintColor: 'gray',
          pressColor :'#42b9f4',
          style: {
            backgroundColor: 'white',
          }

        },
        initialRouteName :'Bulletin',
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        allowFontScaling:true
      }
)


export const SingedIn = StackNavigator(
    {   

        Home:{
            screen:Home
        }
    },
    {
        initialRouteName:'Home'
    }
)

export const Join = StackNavigator({
    Join:{
        screen:JoinClass
    }
})
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

export const InitScreen = StackNavigator(
    {   
        Init:{
            screen:Init
        },
        UpdateInfo:{
            screen:UpdateInfo
        }
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
            InitScreen:{
                screen:InitScreen
            },
            Join:{
                screen:Join
            }
    
        },
        {
            initialRouteName:'AuthLoading'
        }
    )
 