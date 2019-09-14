import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import questionReducer from './reducers/questionReducer';
import logger from './middlewar/logger';

const rootReducer = combineReducers({
  questionReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(logger, thunk));
};

export default configureStore;
