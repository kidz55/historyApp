import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Button} from 'react-native';
import {getScore} from '../store/getters/score';
import {getQuestions} from '../store/actions/questions';

class End extends React.Component {
  goToHomeScreen = () => {
    this.props.qetQuestions();
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <View style={styles.endContainer}>
        <Text>END</Text>
        <Text>Your score: {this.props.score.points}</Text>
        <Text>Your timer: {this.props.score.time}</Text>
        <Button title="NEW GAME" onPress={this.goToHomeScreen} />
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

const mapDispatchToProps = dispatch => {
  return {
    qetQuestions: () => dispatch(getQuestions()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(End);
