export const getCurrentQuestion = state => {
  return state.questionReducer.questions[state.questionReducer.currentIndex];
};

// export const getCurrentScore = state => {
//   return state.questionReducer.questions.map((question, index) => {
//     let score = {color: ''};
//     if (
//       state.questionReducer.historyScore.length > 0 &&
//       state.questionReducer.historyScore.length > index
//     ) {
//       score.color = state.questionReducer.historyScore[index].isGoodAnswer
//         ? '#7cdb9b'
//         : '#db7c7c';
//     } else {
//       score.color = 'green';
//     }
//     return score;
//   });
// };

export const getCurrentScore = state => {
  return state.questionReducer.historyScore;
};

export const isGameOver = state => {
  return (
    state.questionReducer.questions.length <=
    state.questionReducer.currentIndex + 1
  );
};
