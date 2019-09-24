import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Image} from 'react-native';
import {getScore} from '../store/getters/score';
import {getQuestions, retryQuestions} from '../store/actions/questions';
import LinearGradient from 'react-native-linear-gradient';
import ButtonCustom from '../components/button';
import Rating from '../components/rating';

class End extends React.Component {
  state = {
    isRated: false,
  };
  goToHomeScreen = reset => {
    if (reset) {
      this.props.retryQuestions();
    } else {
      this.props.qetQuestions();
    }
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <LinearGradient
        style={styles.endContainer}
        colors={['#005AA7', '#FFFDE4']}>
        <View style={styles.imageContainer}>
          <Image source={require('../static/oscars.png')} />
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}> Your score</Text>
          <View style={styles.scoreWrapper}>
            <Text style={styles.scoreTitle}>{this.props.score.points}/10</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <ButtonCustom
            onPress={() => this.goToHomeScreen(false)}
            buttonText="NEXT GAME"
            buttonColor="#7cdb9b"
          />
          <ButtonCustom
            onPress={() => this.goToHomeScreen(true)}
            buttonText="RETRY"
            buttonColor="#db7c7c"
          />
        </View>
        <Rating />
      </LinearGradient>
    );
  }
  componentDidMount() {}
}

const styles = StyleSheet.create({
  endContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttons: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scoreContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreWrapper: {
    borderWidth: 2,
    borderColor: 'white',
    padding: 5,
  },
  scoreLabel: {
    fontSize: 30,
  },
  scoreTitle: {
    fontSize: 40,
    color: 'white',
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
    retryQuestions: () => dispatch(retryQuestions()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(End);
