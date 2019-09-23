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
    flex: 1,
    justifyContent: 'center',
    width: 300,
    height: 40,
    margin: 2,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
