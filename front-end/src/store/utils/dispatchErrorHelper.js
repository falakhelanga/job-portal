const dispatchErrorhelper = (dispatchType, error, dispatch) => {
  dispatch({
    type: dispatchType,
    error:
      error.response && error.response?.data
        ? error.response?.data?.errors[0].message
        : error.message,
  });
};

export default dispatchErrorhelper;
