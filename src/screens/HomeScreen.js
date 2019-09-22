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
import LinearGradient from 'react-native-linear-gradient';
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
      return <ActivityIndicator animating size="large" color="#005AA7" />;
    }
    return (
      <Button title="PLAY GAME" color="#B93535" onPress={this.goToQuestion} />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#005AA7', '#FFFDE4']}
          style={styles.linearGradient}>
          {this.buttonView()}
        </LinearGradient>
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
    status: state.questionReducer.status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    qetQuestions: () => dispatch(getQuestions()),
  };
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {flex: 1},
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
