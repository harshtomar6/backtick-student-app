import React from 'react';
import { StackNavigator, SwitchNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import { Icon } from 'native-base';
//HomeScreen  imports
import HomeScreen from './containers/homescreen/'
import Profile from './containers/profile'
import CreatePost from './containers/homescreen/createpost/'
import Bulletin from './containers/homescreen/bulletin/'
import Notification from './containers/homescreen/notification/'
import Save from './containers/homescreen/save/'

//Joins imports
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
import { tintColor } from './globals';

export const Home = TabNavigator(
	{
		CreatePost: {
			screen: CreatePost
		},
		Bulletin: {
			screen: Bulletin
		},
		Notification: {
			screen: Notification
		},
		Schedules: {
			screen: Bulletin
		},
		Saved: {
			screen: Save
		},

	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'CreatePost')
					iconName = `ios-add-circle${focused ? '' : '-outline'}`;
				else if (routeName === 'Bulletin')
					iconName = `ios-albums${focused ? '' : '-outline'}`;
				else if (routeName === 'Notification')
					iconName = `ios-notifications${focused ? '' : '-outline'}`;
				else if (routeName === 'Schedules')
					iconName = `ios-calendar${focused ? '' : '-outline'}`
				else if (routeName === 'Saved')
					iconName = `ios-bookmark${focused ? '' : '-outline'}`

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return <Icon name={iconName} style={{ color: tintColor }} />;
			},
			tabStyle: {
			}
		}),
		tabBarOptions: {
			activeTintColor: tintColor,
			inactiveTintColor: '#666',
			pressColor: 'red',
			showLabel: true,
			style: {
				backgroundColor: 'white',
			}

	},
	tabBarComponent: TabBarBottom,
	initialRouteName :'Bulletin',
	tabBarPosition: 'bottom',
	animationEnabled: true,
	swipeEnabled: true,
	allowFontScaling:true
}
)


export const SingedIn = StackNavigator(
	{

		Home: {
			screen: Home
		},
		Profile: {
			screen: Profile
		}
	},
	{
		initialRouteName: 'Home',
		navigationOptions: {
			headerTintColor: tintColor
		}
	}
)

export const Join = StackNavigator({
	Join: {
		screen: JoinClass
	}
})
export const SingedOut = StackNavigator(
	{
		Auth: {
			screen: Auth
		},
		SignUp: {
			screen: SignUp
		},
		VerifyCode: {
			screen: VerifyCode
		},
		ConfirmEmail: {
			screen: ConfirmEmail
		}
	},
	{
		initialRouteName: 'Auth',
		navigationOptions: {
			headerTintColor: tintColor
		}
	}
)

export const InitScreen = StackNavigator(
	{
		Init: {
			screen: Init
		},
		UpdateInfo: {
			screen: UpdateInfo
		}
	}
)
export const RootNavigator = SwitchNavigator(
	{
		AuthLoading: {
			screen: AuthLoading
		},
		SignedIn: {
			screen: SingedIn
		},
		SignedOut: {
			screen: SingedOut
		},
		VerifyEmail: {
			screen: VerifyEmail
		},
		InitScreen: {
			screen: InitScreen
		},
		Join: {
			screen: Join
		}

	},
	{
		initialRouteName: 'AuthLoading'
	}
)
