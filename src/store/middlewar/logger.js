const logger = ({getState}) => {
  return next => action => {
    // console.log('will dispatch', action);

    const returnValue = next(action);

    console.log('state after dispatch', getState().questionReducer);

    return returnValue;
  };
};
export default logger;
