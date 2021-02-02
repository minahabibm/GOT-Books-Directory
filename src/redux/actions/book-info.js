import { BOOK_INFO } from './types';

const booksInfo = (bookInfo, bookChar, bookPovChar) => ({
  type: BOOK_INFO,
  payload: {
    bookInfo, bookChar, bookPovChar,
  },
});

export default booksInfo;
