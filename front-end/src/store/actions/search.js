const searchActions = (value) => (dispatch) => {
  dispatch({
    type: "searching",
    payload: value,
  });
};

export default searchActions;
