import {RATING_DONE} from '../actions/types';

const initialState = {
  isRatingDone: false,
};

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATING_DONE:
      state = {...state, isRatingDone: true};
      break;
  }
  return state;
};

export default ratingReducer;
