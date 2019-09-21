import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native';
import {Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  handleUserResponse,
  selectNextQuestion,
  updateScore,
} from '../store/actions/questions';
import Reponse from '../components/reponse';
import Question from '../components/question';
import {getCurrentQuestion, isGameOver} from '../store/getters/questions';
import {AdMobBanner} from 'react-native-admob';

const MAX_TIME_PER_QUESTION = 1500;

class Game extends React.Component {
  state = {
    questionTimer: 0,
    questionTimerIntervalId: null,
    currentQuestion: {},
    selectedQuestion: {},
    isCurrentQuestionClicked: false,
  };
  goToNextQuestion = () => {
    if (this.props.isGameOver) {
      this.props.navigation.navigate('End');
    } else {
      this.props.selectNextQuestion();
      this.startQuestionSession();
    }
  };
  startQuestionSession = () => {
    this.setState({isCurrentQuestionClicked: false});
    this.setState({questionTimer: 0});
    this.setState({
      questionTimerIntervalId: setInterval(this.increaseQuestionTimer, 10),
    });
  };
  increaseQuestionTimer = () => {
    if (this.state.questionTimer >= MAX_TIME_PER_QUESTION) {
      this.setState({isCurrentQuestionClicked: true});
      clearInterval(this.state.questionTimerIntervalId);
      const statusColorMap = this.props.currentQuestion.responses.map(res => {
        if (res.isAnswer) {
          return 'good';
        }
        return 'unselected';
      });
      this.props.updateScore(false, this.state.questionTimer);
      this.props.handleUserResponse(statusColorMap);
    } else {
      this.setState({questionTimer: this.state.questionTimer + 1});
    }
  };
  handleResponse = indexResponse => {
    let isResponseGood = false;
    this.setState({isCurrentQuestionClicked: true});
    clearInterval(this.state.questionTimerIntervalId);
    if (indexResponse >= 0) {
      this.state.selectedQuestion = this.props.currentQuestion.responses[
        indexResponse
      ];
      isResponseGood = this.state.selectedQuestion.isAnswer;
    }
    const statusColorMap = this.props.currentQuestion.responses.map(res => {
      if (res.isAnswer) {
        return 'good';
      }
      if (
        indexResponse >= 0 &&
        res.value === this.state.selectedQuestion.value
      ) {
        return 'bad';
      }
      return 'unselected';
    });
    this.props.updateScore(isResponseGood, this.state.questionTimer);
    this.props.handleUserResponse(statusColorMap);
    if (isResponseGood) {
      Vibration.vibrate(50);
    } else {
      Vibration.vibrate(300);
    }
  };
  showMessageNextQuestion = () => {
    if (this.state.isCurrentQuestionClicked) {
      return (
        <Text style={styles.tip}>
          Tap the screen to go to the next question
        </Text>
      );
    } else {
      return null;
    }
  };
  componentDidMount() {
    this.startQuestionSession();
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.goToNextQuestion}
        disabled={!this.state.isCurrentQuestionClicked}>
        <View style={styles.container}>
          <Question
            maxTime={MAX_TIME_PER_QUESTION}
            progressStatus={this.state.questionTimer}
            question={this.props.currentQuestion.questionFormatted}
          />
          <View style={styles.reponses}>
            {[0, 1].map(i => {
              return (
                <TouchableOpacity
                  key={i}
                  disabled={this.state.isCurrentQuestionClicked}
                  style={styles.questionContainer}
                  onPress={() => this.handleResponse(i)}>
                  <Reponse
                    statusColor={this.props.statusMap[i]}
                    reponse={this.props.currentQuestion.responses[i]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.reponses}>
            {[2, 3].map(i => {
              return (
                <TouchableOpacity
                  key={i}
                  disabled={this.state.isCurrentQuestionClicked}
                  style={styles.questionContainer}
                  onPress={() => this.handleResponse(i)}>
                  <Reponse
                    statusColor={this.props.statusMap[i]}
                    reponse={this.props.currentQuestion.responses[i]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          {this.showMessageNextQuestion()}
          <View style={styles.advertiser}>
            <AdMobBanner
              adSize="fullBanner"
              adUnitID="ca-app-pub-4007855389429279/6872571512"
              testDevices={['']}
              onAdFailedToLoad={error => console.error(error)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentQuestion: getCurrentQuestion(state),
    isGameOver: isGameOver(state),
    statusMap: state.questionReducer.statusMap,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleUserResponse: statusColor =>
      dispatch(handleUserResponse(statusColor)),
    selectNextQuestion: () => dispatch(selectNextQuestion()),
    updateScore: (isGoodAnswer, time) =>
      dispatch(updateScore(isGoodAnswer, time)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

const styles = StyleSheet.create({
  questionContainer: {
    justifyContent: 'center',
    backgroundColor: '#e1e1e1',
    borderColor: 'white',
    borderWidth: 2,
    width: '50%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  timer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  questionLabel: {
    textAlign: 'justify',
    fontSize: 21,
    padding: 5,
  },
  question: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  reponses: {
    flex: 2,
    flexDirection: 'row',
  },
  tip: {
    fontSize: 15,
    textAlign: 'center',
  },
  advertiser: {
    flex: 0.5,
    backgroundColor: 'red',
  },
});
