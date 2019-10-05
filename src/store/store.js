import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import questionReducer from './reducers/questionReducer';
import ratingReducer from './reducers/ratingReducer';
import optionReducer from './reducers/optionReducer';
import logger from './middlewar/logger';

const rootReducer = combineReducers({
  questionReducer,
  ratingReducer,
  optionReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(logger, thunk));
};

export default configureStore;
