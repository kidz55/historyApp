import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {getQuestions} from '../store/actions/questions';

class HomeScreen extends React.Component {
  state = {
    questions: [],
  };
  goToQuestion = () => {
    this.props.navigation.navigate('Game');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.placeName}</Text>
        <Button title="home" onPress={this.goToQuestion} />
      </View>
    );
  }
  componentDidMount() {
    this.props.qetQuestions();
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    qetQuestions: () => dispatch(getQuestions()),
  };
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
