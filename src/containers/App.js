/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { RootNavigator } from '../route'
import io from 'socket.io-client';
import { Sockets } from './../actions/posts/ws';
import { BASE_URL } from './../globals';

export default class App extends Component {

  constructor(props){
    super(props)
    
    this.socket = io(BASE_URL);
  }

  componentDidMount(){
    // Connect Sockets
    Sockets.init(this.socket);
    Sockets.listenEvents(this.socket);
  }

  render() {
    
    return (
      <RootNavigator />
    );
  }
}
