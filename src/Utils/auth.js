import {addListener,eventDispatch} from './events'
import {getUserData,storeUserData,removeUserData} from './user'


class CustomAuth {
    
    static async onAuthStateChange(){
        console.log('Custom OnAuthStateChaned')
        const user =  getUserData()
        
        return user
        
        
    }
    static async getUserLocalStorage(){
        const user =  getUserData()
        return user
    }
    static setUserLocalStorage(user){
        console.log('setUserLocalStorage');
        storeUserData(user)
        eventDispatch('auth-state-change')
    }

    static removeUserLocalStorage(){
        console.log('removeUserLocalStorage');
        removeUserData()
        eventDispatch('auth-state-change')
    }
}

//event.addListener('auth-state-change',CustomAuth.onAuthStateChange)

export default CustomAuth