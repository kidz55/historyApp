import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class Bar extends Component {
  getColor = () => {
    return this.props.score.isGoodAnswer ? 'green' : 'red';
  };
  render() {
    return <View style={[styles.bar, {backgroundColor: this.getColor()}]} />;
  }
}

const styles = StyleSheet.create({
  bar: {
    width: 25,
    height: 5,
    margin: 2,
    backgroundColor: 'green',
  },
});
