import React from 'react';
import {View, StyleSheet} from 'react-native';
import Bar from './bar';

export default class Score extends React.Component {
  render() {
    return (
      <View style={styles.score}>
        {this.props.score.map((score, i) => {
          return <Bar key={i} score={score} />;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  score: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
