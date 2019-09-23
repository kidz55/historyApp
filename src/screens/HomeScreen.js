import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import ButtonCustom from '../components/button';
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
      <ButtonCustom
        onPress={this.goToQuestion}
        buttonText="START QUIZ"
        buttonColor="#7cdb9b"
      />
    );
  };
  render() {
    return (
      <LinearGradient
        style={styles.linearGradient}
        colors={['#005AA7', '#FFFDE4']}>
        <View style={styles.button}>{this.buttonView()}</View>
      </LinearGradient>
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
  button: {
    height: 50,
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
