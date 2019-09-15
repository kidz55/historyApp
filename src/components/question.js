import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Question = props => {
  return (
    <View style={styles.question}>
      <Text style={styles.questionLabel}>{props.question}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  questionLabel: {
    textAlign: 'justify',
    fontSize: 21,
    padding: 5,
    paddingLeft: 10,
  },
  question: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Question;
