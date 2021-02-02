const initialState = {
  bookInfo: {},
  bookChar: [],
  bookPovChar: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BOOK_INFO': {
      return {
        ...state,
        bookInfo: action.payload.bookInfo,
        bookChar: action.payload.bookChar,
        bookPovChar: action.payload.bookPovChar,
      };
    }
    default:
      return state;
  }
};

export default reducer;
