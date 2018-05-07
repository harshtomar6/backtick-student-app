import React, { Fragment } from 'react';
import { View, Text} from 'react-native';

export default class CalculateTime extends React.Component {
  constructor(){
    super();
    this.state = {
      time: ''
    }
  }

  componentDidMount(){
    let date = new Date(this.props.timestamp);
    this.setState({time: date.toUTCString()});  
  }

  render(){
    return (
      <Fragment>
        <Text style={this.props.style}>{this.state.time}</Text>
      </Fragment>
    );
  }

}

CalculateTime.defaultProps = {
  timestamp: '',
  style: {color:'#000'}
}
