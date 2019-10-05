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
    isRemoveAdsPurchased: false,
  };
  removeAds = async () => {
    try {
      await RNIap.requestPurchase('remove_ads', false);
    } catch (err) {
      console.warn(err.code, err.message);
    } finally {
      if (this.props.navigation.state.params.parentView === 'Home') {
        this.setState({
          isRemoveAdsPurchased: true,
        });
        this.props.navigation.navigate('Game');
      } else {
        this.props.navigation.navigate('End');
      }
      this.props.purchaseRemoveAds();
    }
  };
  getLabelButtonWithPrice = () => {
    return this.state.inappPurchases.length > 0
      ? `REMOVE ADS (${this.state.inappPurchases[0].localizedPrice})`
      : 'REMOVE ADS';
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
        {!this.state.isRemoveAdsPurchased ? (
          <View>
            <View style={styles.purchaseTextContainer}>
              <Text style={styles.purchaseText}>
                In order to monetize this app, I shamefully use adveristing but
                if you're willing to buy me a coffee, I'll remove them for you.
              </Text>
            </View>
            <View style={styles.purchaseButtonContainer}>
              <ButtonCustom
                onPress={this.removeAds}
                buttonColor="green"
                buttonText={this.getLabelButtonWithPrice()}
              />
            </View>
          </View>
        ) : (
          <View style={styles.purchaseTextContainer}>
            <Text style={styles.purchaseText}>THANK YOU VERY MUCH</Text>
          </View>
        )}
      </LinearGradient>
    );
  }
  componentDidMount() {
    RNIap.getPurchaseHistory()
      .then(purchases => {
        this.setState({
          isRemoveAdsPurchased: purchases.some(
            el => el.productId === 'remove_ads',
          ),
        });
      })
      .catch(error => {
        console.log(error.message);
      });
    RNIap.getProducts(this.items)
      .then(products => {
        this.setState({inappPurchases: products});
        console.log('PRODUCTS', products);
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
  return {};
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
