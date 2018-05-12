import React , { Component } from 'react'

import { Provider } from 'react-redux'

import reducers from './reducers'
import App from './containers/App'
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './configureStore'
import configureStore from './configureStore'


export default class Init extends Component{
    constructor(props){
        super(props)
        console.disableYellowBox = true 
    }
    componentDidMount(){
        console.disableYellowBox = false
   }
    render(){

        return(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>                
                    
            </Provider>
        )
    }
}