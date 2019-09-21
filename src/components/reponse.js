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
        style.backgroundColor = '#db7c7c';
        break;
      case 'good':
        style.backgroundColor = '#7cdb9b';
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
    padding: 7,
  },
});

export default Reponse;
