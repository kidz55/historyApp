import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class ProgressBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={[styles.inner, {width: this.props.progressStatus + '%'}]}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    borderWidth: 1,
    borderRadius: 7.5,
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    height: 29,
    borderRadius: 7.5,
    backgroundColor: 'green',
  },
});
