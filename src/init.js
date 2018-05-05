import React , { Component } from 'react'
import { compose , createStore , applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import App from './containers/App'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
            <Provider store={createStore(reducers,composeEnhancers(applyMiddleware(thunk)))}>
                <App />
            </Provider>
        )
    }
}