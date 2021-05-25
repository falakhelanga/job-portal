const reducerState = (oldState, newValues) => {
  return { ...oldState, ...newValues };
};

export default reducerState;
