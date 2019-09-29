import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';

export default class EmojiButton extends React.Component {
  state = {
    path: '',
  };
  componentWillMount() {
    switch (this.props.emoji) {
      case 'bad':
        this.state.path = require('../static/emoji_bad.png');
        break;
      case 'good':
        this.state.path = require('../static/emoji_good.png');
        break;
      case 'love':
        this.state.path = require('../static/emoji_love.png');
        break;
      case 'angry':
        this.state.path = require('../static/emoji_angry.png');
        break;
      default:
        this.state.path = require('../static/emoji_angry.png');
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
          this.props.onEmojiPress();
        }}>
        <Animated.Image style={transformStyle} source={this.state.path} />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
});
