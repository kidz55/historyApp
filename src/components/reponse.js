import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Reponse = props => {
  const reactiveStyle = () => {
    let style = {
      flex: 5,
      justifyContent: 'center',
    };
    switch (props.statusColor) {
      case 'bad':
        style.backgroundColor = '#c93838';
        break;
      case 'good':
        style.backgroundColor = '#43ab92';
        break;
      default:
        style.backgroundColor = null;
    }
    return style;
  };
  return (
    <View style={reactiveStyle()}>
      <Text style={styles.reponse}>{props.reponse.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reponse: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
    padding: 7,
  },
});

export default Reponse;
