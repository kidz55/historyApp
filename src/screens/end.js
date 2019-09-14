import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class End extends React.Component {
  render() {
    return (
      <View style={styles.endContainer}>
        <Text>FINI</Text>
      </View>
    );
  }
  componentDidMount() {}
}

const styles = StyleSheet.create({
  endContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default End;
