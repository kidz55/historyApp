import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import EmojiButton from './emojiButton';
import Rate, {AndroidMarket} from 'react-native-rate';
import {connect} from 'react-redux';
import {ratingDone} from '../store/actions/ratingAction';

class Rating extends React.Component {
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
        this.props.ratingDone();
      }
    });
  };
  thankUser = () => {
    this.props.ratingDone();
  };
  showRatingView = () => {
    return !this.props.isRatingDone ? (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Did you enjoy the quiz</Text>
        <View style={styles.ratingWrapper}>
          <EmojiButton emoji="angry" onEmojiPress={this.thankUser} />
          <EmojiButton emoji="bad" onEmojiPress={this.thankUser} />
          <EmojiButton emoji="good" onEmojiPress={this.goToRating} />
          <EmojiButton emoji="love" onEmojiPress={this.goToRating} />
        </View>
      </View>
    ) : (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Thank you</Text>
      </View>
    );
  };
  render() {
    return this.showRatingView();
  }
}

const mapStateToProps = state => {
  return {
    isRatingDone: state.ratingReducer.isRatingDone,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ratingDone: () => dispatch(ratingDone()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rating);

const styles = StyleSheet.create({
  ratingContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingTitle: {
    fontSize: 30,
    color: 'white',
  },
  ratingWrapper: {
    flexDirection: 'row',
  },
});
