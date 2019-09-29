import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import questionReducer from './reducers/questionReducer';
import ratingReducer from './reducers/ratingReducer';
import logger from './middlewar/logger';

const rootReducer = combineReducers({
  questionReducer,
  ratingReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(logger, thunk));
};

export default configureStore;
