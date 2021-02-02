const initialState = {
  searchButton: true,
  resultsState: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_VISIBLE': {
      return {
        ...state,
        searchButton: !(state.searchButton),
      };
    }
    case 'RESULTS_VISIBLE': {
      return {
        ...state,
        resultsState: !(state.resultsState),
      };
    }
    default:
      return state;
  }
};

export default reducer;
