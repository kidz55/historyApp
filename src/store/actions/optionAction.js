import {REMOVE_ADS_PURCHASE} from '../actions/types';
import * as RNIap from 'react-native-iap';

export const purchaseRemoveAds = () => {
  return function(dispatch) {
    dispatch({
      type: REMOVE_ADS_PURCHASE,
    });
  };
};

export const initOptions = async () => {
  RNIap.initConnection();
  const purchases = await RNIap.getPurchaseHistory();
  if (purchases.some(el => el.productId === 'remove_ads'))
    return purchaseRemoveAds();
};
