import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';

export default class quizButton extends React.Component {
  state = {
    path: '',
  };
  componentWillMount() {
    switch (this.props.quiz) {
      case 'movie':
        this.state.path = require('../static/sport.png');
        break;
      default:
        this.state.path = require('../static/sport.png');
    }
  }
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
      <TouchableWithoutFeedback
        onPress={() => {
          scaleValue.setValue(0);
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start();
          this.props.onquizPress();
        }}>
        <Animated.Image style={transformStyle} source={this.state.path} />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
});
