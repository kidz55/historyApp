import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native';

const Reponse = props => {
  const onPressed = () => {
    if (props.reponse.isAnswer) {
      Vibration.vibrate(50);
    } else {
      Vibration.vibrate(300);
    }
  };
  return (
    <View>
      <Text style={styles.reponse}>{props.reponse.value}</Text>
      <Text style={styles.reponse}>{props.statusColor}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reponse: {
    textAlign: 'center',
    fontSize: 17,
  },
});

export default Reponse;
