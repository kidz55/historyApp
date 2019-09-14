import {
  QUESTION_FAILED,
  QUESTION_RECEIVED,
  QUESTION_REQUESTED,
  INC_CURRENT_INDEX,
  UPDATE_STATUS_MAP,
  INIT_STATUS_MAP,
  UPDATE_SCORE,
} from '../actions/types';

const initialState = {
  questions: [],
  historyScore: [],
  currentIndex: 0,
  statusMap: ['unselected', 'unselected', 'unselected', 'unselected'],
  status: 'waiting',
  error: '',
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INC_CURRENT_INDEX:
      state = {...state, currentIndex: state.currentIndex + 1};
      break;
    case UPDATE_STATUS_MAP:
      state = {...state, statusMap: action.payload};
      break;
    case UPDATE_SCORE:
      let historyScore = state.historyScore;
      historyScore.push(action.payload);
      state = {...state, historyScore: historyScore};
      break;
    case INIT_STATUS_MAP:
      state = {
        ...state,
        statusMap: ['unselected', 'unselected', 'unselected', 'unselected'],
      };
      break;
    case QUESTION_REQUESTED:
      state = Object.assign({}, state, {status: 'waiting'});
      break;
    case QUESTION_RECEIVED:
      state = Object.assign({}, state, {
        questions: formatQuestions([...action.payload]),
        currentIndex: 0,
        historyScore: [],
        statusMap: ['unselected', 'unselected', 'unselected', 'unselected'],
        status: 'received',
      });
      break;
    case QUESTION_FAILED:
      state = Object.assign({}, state, {
        status: 'failed',
        error: action.payload,
      });
      break;
  }
  return state;
};

export default questionsReducer;

const formatQuestions = questions => {
  if (!questions.length) {
    return [];
  }
  const formattedQuestions = questions.map((question, index) => {
    let questionObjFormatted;
    const questionFormatted = decode(question.question);
    const responses = shuffle([
      ...question.incorrect_answers,
      question.correct_answer,
    ]);
    const resFormatted = responses.map(r => {
      return {value: decode(r), isAnswer: r === question.correct_answer};
    });
    questionObjFormatted = {
      responses: resFormatted,
      id: index,
      questionFormatted: questionFormatted,
      ...question,
    };
    return questionObjFormatted;
  });

  return formattedQuestions;
};

const shuffle = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

var he = require('he');

const decode = str => {
  return he.decode(str);
};
