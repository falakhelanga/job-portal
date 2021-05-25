const initState = {
  value: "",
};

const SearchReducer = (state = initState, action) => {
  switch (action.type) {
    case "searching":
      return { value: action.payload };
    default:
      return state;
  }
};

export default SearchReducer;
