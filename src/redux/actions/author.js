import * as All from "./actionTypes";
import axios from "axios";
import { resetErrors } from "./errors";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

export const fetchAuthorDetail = authorID => async dispatch => {
  dispatch({
    type: All.SET_AUTHOR_LOADING
  });
  try {
    const res = await instance.get(`/api/authors/${authorID}/`);
    const author = res.data;
    dispatch({
      type: All.SET_AUTHOR_DETAIL,
      payload: author
    });
  } catch (err) {}
};

//POST THE BOOK TO https://the-index-api.herokuapp.com/api/books/
export const postBook = (book, closeModal) => async dispatch => {
  try {
    const res = await instance.post("/api/books/", book);
    const newBook = res.data;
    dispatch(resetErrors());
    dispatch({
      type: All.ADD_BOOK,
      payload: newBook
    });
    dispatch(resetErrors());
    closeModal();
  } catch (err) {
    dispatch({
      type: All.SET_ERRORS,
      payload: err.response.data
    });
  }
};
