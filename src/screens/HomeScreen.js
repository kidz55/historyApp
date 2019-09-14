import React from 'react';
import {
  View,
  Icon,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {getQuestions} from '../store/actions/questions';

class HomeScreen extends React.Component {
  state = {
    questions: [],
    status: '',
  };
  goToQuestion = () => {
    this.props.navigation.navigate('Game');
  };
  buttonView = () => {
    if (this.props.status === 'waiting') {
      return <ActivityIndicator animating size="large" color="#00ff00" />;
    }
    return (
      <Button title="PLAY GAME" loading={true} onPress={this.goToQuestion} />
    );
  };
  render() {
    return <View style={styles.container}>{this.buttonView()}</View>;
  }
  componentDidMount() {
    this.props.qetQuestions();
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    status: state.questionReducer.status,
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
