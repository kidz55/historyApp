import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import {connect} from 'react-redux';
import ButtonCustom from '../components/button';
import LinearGradient from 'react-native-linear-gradient';
import {getQuestions} from '../store/actions/questions';
import {purchaseRemoveAds} from '../store/actions/optionAction';
import * as RNIap from 'react-native-iap';

class HomeScreen extends React.Component {
  state = {
    questions: [],
    status: '',
  };
  goToQuestion = () => {
    this.props.navigation.navigate('Game');
  };
  goToPurchase = () => {
    this.props.navigation.navigate('Purchase', {parentView: 'Home'});
  };
  buttonView = () => {
    if (this.props.status === 'waiting') {
      return <ActivityIndicator animating size="large" color="#005AA7" />;
    }
    return this.props.isRemoveAdsPurchased ? (
      <View style={styles.buttonGroup}>
        <ButtonCustom
          style={styles.buttonWrapper}
          onPress={this.goToQuestion}
          buttonText="START QUIZ"
          buttonColor="#43ab92"
        />
      </View>
    ) : (
      <View style={styles.buttonGroup}>
        <ButtonCustom
          style={styles.buttonWrapper}
          onPress={this.goToPurchase}
          buttonText="START QUIZ WITHOUT ADS"
          buttonColor="green"
        />
        <ButtonCustom
          style={styles.buttonWrapper}
          onPress={this.goToQuestion}
          buttonText="START QUIZ"
          buttonColor="#43ab92"
        />
      </View>
    );
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
    scaleValue.setValue(0);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    return (
      <LinearGradient
        style={styles.linearGradient}
        colors={['#f75f00', '#512c62']}>
        <View style={styles.imgWrapper}>
          <Animated.Image
            style={transformStyle}
            source={require('../static/home_movie.png')}
          />
          <View style={styles.button}>{this.buttonView()}</View>
        </View>
      </LinearGradient>
    );
  }
  componentDidMount() {
    RNIap.getPurchaseHistory()
      .then(purchases => {
        if (purchases.some(el => el.productId === 'remove_ads')) {
          this.props.purchaseRemoveAds();
        }
      })
      .catch(error => {
        console.log(error.message);
      });
    this.props.qetQuestions();
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    status: state.questionReducer.status,
    isRemoveAdsPurchased: state.optionReducer.isRemoveAdsPurchased,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    qetQuestions: () => dispatch(getQuestions()),
    purchaseRemoveAds: () => dispatch(purchaseRemoveAds()),
  };
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  buttonWrapper: {
    marginBottom: 50,
  },
  buttonGroup: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginTop: 50,
    height: 50,
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
