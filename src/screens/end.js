import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {getScore} from '../store/getters/score';
import {getQuestions} from '../store/actions/questions';
import LinearGradient from 'react-native-linear-gradient';
import ButtonCustom from '../components/button';
import Rate, {AndroidMarket} from 'react-native-rate';

class End extends React.Component {
  state = {
    isRated: false,
  };
  goToHomeScreen = () => {
    this.props.qetQuestions();
    this.props.navigation.navigate('Home');
  };
  thankUser = () => {
    console.log('thx');
  };
  goToRating = () => {
    let options = {
      GooglePackageName: 'com.quizzy.quizz',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
    };
    Rate.rate(options, success => {
      if (success) {
        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
        this.setState({isRated: true});
      }
    });
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
            onPress={this.goToHomeScreen}
            buttonText="NEXT GAME"
            buttonColor="#7cdb9b"
          />
          <ButtonCustom
            onPress={this.goToHomeScreen}
            buttonText="RETRY"
            buttonColor="#db7c7c"
          />
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Did you enjoy the quiz</Text>
          <View style={styles.ratingWrapper}>
            <TouchableWithoutFeedback onPress={this.thankUser}>
              <Image
                style={styles.image}
                source={require('../static/emoji_angry.png')}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.thankUser}>
              <Image
                style={styles.image}
                source={require('../static/emoji_bad.png')}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.goToRating}>
              <Image
                style={styles.image}
                source={require('../static/emoji_good.png')}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.goToRating}>
              <Image
                style={styles.image}
                source={require('../static/emoji_love.png')}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
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
  image: {
    width: 70,
    height: 70,
  },
  scoreContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingWrapper: {
    flexDirection: 'row',
  },
  scoreWrapper: {
    borderWidth: 2,
    borderColor: 'white',
    padding: 5,
  },
  scoreLabel: {
    fontSize: 30,
  },
  ratingTitle: {
    fontSize: 30,
    color: 'white',
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(End);
