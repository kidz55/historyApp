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
    height: 40,
    padding: 3,
    borderWidth: 3,
    borderRadius: 30,
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    height: 30,
    borderRadius: 15,
    backgroundColor: 'green',
  },
  label: {
    fontSize: 23,
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
});
