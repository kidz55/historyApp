import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuizButton from '../components/quizzButton';
import Rate, {AndroidMarket} from 'react-native-rate';

class MoreQuiz extends React.Component {
  goToSport = () => {
    let options = {
      GooglePackageName: 'com.quizzy.sport',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
    };
    Rate.rate(options, success => {});
  };
  render() {
    return (
      <LinearGradient
        style={styles.endContainer}
        colors={['#207561', '#da4302']}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>More Quizzes</Text>
        </View>
        <View style={styles.imageContainer}>
          <QuizButton quiz="sport" onquizPress={this.goToSport} />
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
  image: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: 'white',
  },
});

export default MoreQuiz;
