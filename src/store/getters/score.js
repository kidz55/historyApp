export const getScore = state => {
  return state.questionReducer.historyScore.reduce(
    (acc, curr) => {
      acc.points = curr.isGoodAnswer ? acc.points + 1 : acc.points;
      acc.time += curr.time;
      return acc;
    },
    {
      points: 0,
      time: 0,
    },
  );
};
