import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import Rate, {AndroidMarket} from 'react-native-rate';

export default class Rating extends React.Component {
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
  thankUser = () => {
    console.log('thx');
  };
  render() {
    let scaleValue = new Animated.Value(0);
    const buttonScale = scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.8, 1],
    });
    let transformStyle = {
      ...styles.image,
      transform: [{scale: buttonScale}],
    };
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Did you enjoy the quiz</Text>
        <View style={styles.ratingWrapper}>
          <TouchableWithoutFeedback
            onPress={() => {
              scaleValue.setValue(0);
              Animated.timing(scaleValue, {
                toValue: 1,
                duration: 250,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start();
              this.thankUser();
            }}>
            <Animated.Image
              style={transformStyle}
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
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  ratingTitle: {
    fontSize: 30,
    color: 'white',
  },
  ratingWrapper: {
    flexDirection: 'row',
  },
});
