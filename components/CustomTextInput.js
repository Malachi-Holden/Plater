import React, { Component } from 'react';

import {TextInput, View} from 'react-native';

export default class CustomTextInput extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return <View style={{
      borderWidth: 1,
      marginTop: 20,
      marginBottom: 10,
      ...this.props.style
    }}>
    <TextInput 
      placeholder={this.props.placeholder}
      onChangeText={this.props.onChangeText}
      value={this.props.value}
      style={{
        textAlign: 'center',
        fontSize: this.props.style.fontSize
      }}
    />
  </View>
  }
}