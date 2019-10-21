import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.button, {backgroundColor: this.props.buttonColor}]}>
        <Text style={styles.text}>{this.props.buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: 300,
    height: 80,
    margin: 2,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
