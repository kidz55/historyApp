import Axios from 'axios';
import {
  QUESTION_REQUESTED,
  QUESTION_RECEIVED,
  QUESTION_FAILED,
  UPDATE_STATUS_MAP,
  INIT_STATUS_MAP,
  INC_CURRENT_INDEX,
  UPDATE_SCORE,
} from '../actions/types';

export const handleUserResponse = statusMap => {
  return {
    type: UPDATE_STATUS_MAP,
    payload: statusMap,
  };
};

export const updateScore = (isGoodAnswer, time) => {
  return {
    type: UPDATE_SCORE,
    payload: {isGoodAnswer, time},
  };
};

export const selectNextQuestion = () => {
  return function(dispatch) {
    dispatch({
      type: INIT_STATUS_MAP,
    });
    dispatch({
      type: INC_CURRENT_INDEX,
    });
  };
};

export const getQuestions = () => {
  return function(dispatch) {
    dispatch({
      type: QUESTION_REQUESTED,
    });
    Axios.get('https://opentdb.com/api.php?amount=20&category=11&type=multiple')
      .then(res =>
        dispatch({
          type: QUESTION_RECEIVED,
          payload: res.data.results,
        }),
      )
      .catch(error =>
        dispatch({
          type: QUESTION_FAILED,
          payload: error,
        }),
      );
  };
};
