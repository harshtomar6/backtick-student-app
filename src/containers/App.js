/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { RootNavigator } from '../route'


export default class App extends Component {

  constructor(props){
    super(props)

  }

  render() {
    
    return (
      <RootNavigator />
    );
  }
}
