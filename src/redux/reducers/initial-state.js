const initialState = {
  bookNames: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_NAMES': {
      return {
        ...state,
        bookNames: action.payload.names,
      };
    }
    default:
      return state;
  }
};

export default reducer;
