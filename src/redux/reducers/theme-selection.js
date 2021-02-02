const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialState = {
  theme: isDark,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_THEME': {
      return {
        ...state,
        theme: !(state.theme),
      };
    }
    default:
      return state;
  }
};

export default reducer;
