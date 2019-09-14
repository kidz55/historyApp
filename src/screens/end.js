import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {getScore} from '../store/getters/score';

class End extends React.Component {
  render() {
    return (
      <View style={styles.endContainer}>
        <Text>FINI</Text>
        <Text>Your score: {this.props.score.points}</Text>
        <Text>Your timer: {this.props.score.time}</Text>
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

const mapStateToProps = state => {
  return {
    score: getScore(state),
  };
};

export default connect(mapStateToProps)(End);
