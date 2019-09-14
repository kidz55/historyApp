export const getCurrentQuestion = state => {
  return state.questionReducer.questions[state.questionReducer.currentIndex];
};

export const isGameOver = state => {
  return (
    state.questionReducer.questions.length <=
    state.questionReducer.currentIndex + 1
  );
};
