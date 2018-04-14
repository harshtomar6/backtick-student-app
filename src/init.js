import React , { Component } from 'react'
import { createStore , applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import App from './containers/App'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
export default class Init extends Component{
    constructor(props){
        super(props)
        console.disableYellowBox = true 
    }
    componentDidMount(){
        console.disableYellowBox = true
   }
    render(){

        return(
            <Provider store={createStoreWithMiddleware(reducers)}>
                <App />
            </Provider>
        )
    }
}