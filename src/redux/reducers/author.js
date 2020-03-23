import * as All from "../actions/actionTypes";

const initialState = {
  author: null,
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case All.SET_AUTHOR_DETAIL:
      return {
        ...state,
        author: action.payload,
        loading: false
      };

    case All.SET_AUTHOR_LOADING:
      return {
        ...state,
        loading: true
      };

    case All.ADD_BOOK:
      //UPDATE THE STATE ACCORDINGLY
      return {
        ...state,
        author: {
          ...state.author,
          books: [action.payload].concat(state.author.books)
        }
      };
    default:
      return state;
  }
};

export default reducer;
