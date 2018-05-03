
//function to store user locally
import {AsyncStorage} from 'react-native'
export async function storeUserData(user){
    console.log('storeUserData');
    try{
    await AsyncStorage.setItem('@backtick:user', JSON.stringify(user))
    console.log('User is added to local storage');
    }
    catch(err){
        console.log('Error in storing user data',err);
    }
}

//function to get uesr locally

export async function getUserData(){
    try {
        console.log('getUserData');
        const user = await AsyncStorage.getItem('@backtick:user');
        if (user !== null){
          // We have data!!
          //console.log(user);
          return JSON.parse(user)
        }
        console.log('no user');
        return ''
      } catch (error) {
        console.log('Error retrieving data');
          alert('Error retrieving data')
        // Error retrieving data
      }
}

//function to remove user locally

export async function removeUserData(){
    
    try {
        console.log('removeUserData');
        await AsyncStorage.removeItem('@backtick:user');

      } catch (error) {
        console.log('Error Removing data');
        // Error retrieving data
      }
}