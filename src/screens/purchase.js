import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {purchaseRemoveAds} from '../store/actions/optionAction';
import LinearGradient from 'react-native-linear-gradient';
import ButtonCustom from '../components/button';
import * as RNIap from 'react-native-iap';

class Purchase extends React.Component {
  items = Platform.select({
    android: ['remove_ads'],
  });
  state = {
    inappPurchases: [],
    receipt: {},
  };
  goToGame = () => {
    this.props.navigation.navigate('Game');
  };
  removeAds = async () => {
    let purchaseUpdate = RNIap.purchaseUpdatedListener();
    console.log(purchaseUpdate);
    RNIap.requestPurchase('remove_ads', false).finally(() => {
      if (this.props.navigation.state.params.parentView === 'Home') {
        this.props.navigation.navigate('Game');
      } else {
        this.props.navigation.navigate('End');
      }
    });
  };
  getLabelButtonWithPrice = () => {
    return this.state.inappPurchases.length > 0
      ? `REMOVE ADS (${this.state.inappPurchases[0].localizedPrice})`
      : 'REMOVE ADS';
  };
  buyRemoveAddView = () => {
    return (
      <View>
        <View style={styles.purchaseTextContainer}>
          <Text style={styles.purchaseText}>
            In order to monetize this app, I use adveristing but if if you're
            willing to buy me a coffee, I'll remove them for you.
          </Text>
        </View>
        <View style={styles.purchaseButtonContainer}>
          <ButtonCustom
            onPress={this.removeAds}
            buttonColor="#43ab92"
            buttonText={this.getLabelButtonWithPrice()}
          />
        </View>
      </View>
    );
  };
  thankYouView = () => {
    return (
      <View style={styles.purchaseTextContainer}>
        <Text style={styles.purchaseText}>THANK YOU VERY MUCH</Text>
        <View style={styles.purchaseButtonContainer}>
          <ButtonCustom
            onPress={this.goToGame}
            buttonColor="#43ab92"
            buttonText="START GAME"
          />
        </View>
      </View>
    );
  };
  render() {
    return (
      <LinearGradient
        style={styles.purchaseContainer}
        colors={['#f75f00', '#512c62']}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../static/coffee-cup.png')}
          />
        </View>
        {!this.props.isRemoveAdsPurchased
          ? this.buyRemoveAddView()
          : this.thankYouView()}
      </LinearGradient>
    );
  }
  componentDidMount() {
    RNIap.getProducts(this.items)
      .then(products => {
        this.setState({inappPurchases: products});
        console.log('PRODUCTS', products);
        this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
          inAppPurchase => {
            if (
              'productId' in inAppPurchase &&
              inAppPurchase.productId === 'remove_ads'
            ) {
              this.props.purchaseRemoveAds();
            }
          },
        );
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  purchaseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchaseTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchaseText: {
    color: 'white',
    padding: 40,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  purchaseButtonContainer: {
    alignItems: 'center',
    height: 100,
    padding: 20,
  },
});

const mapStateToProps = state => {
  return {
    isRemoveAdsPurchased: state.optionReducer.isRemoveAdsPurchased,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseRemoveAds: () => dispatch(purchaseRemoveAds()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Purchase);
