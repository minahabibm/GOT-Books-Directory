import axios from 'axios';
import { FETCH_BOOKS_NAMES } from './types';

// synchronous action creator
const fetchPostsSuccess = (names) => ({
  type: FETCH_BOOKS_NAMES,
  payload: { names },
});

// asynchronous thunk action creator calls the api, then dispatches the synchronous action creator
export const fetchBooksNames = () => async (dispatch) => {
  try {
    const books = [];
    await Promise.all(
      [...Array(12)].map(async (item, index) => {
        const response = await axios.get(`https://anapioficeandfire.com/api/books/${index + 1}`);
        const bookName = await response.data.name;
        books.push({ title: bookName, index: index + 1 });
      }),
    );
    dispatch(fetchPostsSuccess(books));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export default fetchBooksNames;
