import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProgressBar from './progressBar';

const Question = props => {
  return (
    <View style={styles.question}>
      <Text style={styles.questionLabel}>{props.question} </Text>
      <ProgressBar
        maxTime={props.maxTime}
        progressStatus={props.progressStatus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  questionLabel: {
    textAlign: 'justify',
    fontSize: 21,
    padding: 5,
    marginBottom: 10,
  },
  question: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Question;
