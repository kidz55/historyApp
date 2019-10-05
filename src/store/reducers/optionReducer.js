import {REMOVE_ADS_PURCHASE} from '../actions/types';

const initialState = {
  isRemoveAdsPurchased: false,
};

const optionReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case REMOVE_ADS_PURCHASE:
      state = {...state, isRemoveAdsPurchased: true};
      console.log(state);
      break;
  }
  return state;
};

export default optionReducer;
