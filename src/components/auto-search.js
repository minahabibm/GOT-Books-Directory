import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import booksInfo from '../redux/actions/book-info';
import { searchVisible, resultsVisible } from '../redux/actions/visibility';
import Search from './search-button';

const fetshingBookInfo = async (indexKeyAutoSearch, bookTitlesProp) => {
  const id = bookTitlesProp.filter((key) => key.title === indexKeyAutoSearch)[0].index;
  let bookInfo = {};
  const bookChar = [];
  const bookPovChar = [];
  let dataLoadedArr;

  await axios.get(`https://anapioficeandfire.com/api/books/${id}`).then(async (response) => {
    const bookData = response.data;
    try {
      await Promise.all(
        bookData.characters.map(async (url) => {
          const charResponse = await axios.get(url);
          const charName = await charResponse.data.name;
          bookChar.push([charName, url]);
        }),
      );
      await Promise.all(
        bookData.povCharacters.map(async (url) => {
          const povCharResponse = await axios.get(url);
          const povCharkName = await povCharResponse.data.name;
          bookPovChar.push([povCharkName, url]);
        }),
      );
      bookInfo = bookData;
      delete bookInfo.characters;
      delete bookInfo.povCharacters;
      dataLoadedArr = [bookInfo, bookChar, bookPovChar];
    } catch (error) {
      dataLoadedArr = error;
    }
  }, (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
    dataLoadedArr = error;
  });
  return dataLoadedArr;
};

function AutoSearch(props) {
  const {
    bookTitles, searchView, resultVisible, booksInfos,
  } = props;
  const [loading, setLoading] = useState(false);
  const [indexKey, setIndexKey] = useState('');
  const [error, setError] = useState(false);

  const handleClickLoading = async (index) => {
    setLoading(true);
    setIndexKey(index);
  };

  useEffect(() => {
    if (loading) {
      (async () => {
        const dataArray = await fetshingBookInfo(indexKey, bookTitles);
        if (Array.isArray(dataArray)) {
          booksInfos(dataArray[0], dataArray[1], dataArray[2]);
          setLoading(false);
          setError(false);
          searchView();
          resultVisible();
        } else {
          setLoading(!loading);
          setError(true);
        }
      })();
    }
  }, [loading]);

  return (
    // Autocomplete works fine, the only concern is to fire the search for the same book
    // consecutively.
    // After searching, obtaining results and returning to the search page,
    // the last search remains inside text box. If the user attempts the
    // same search from the drop down, to the same book, there will not fire (onChange).
    // (onChange) will trigger by changing the text submitted from the last search.
    <div>
      <Box display="flex">
        <Search bool />
        <Autocomplete
          freeSolo
          autoComplete
          id="free-solo-2-demo"
          disableClearable
          options={bookTitles.map((option) => option.title)}
          onChange={(event, index) => handleClickLoading(index)}
          style={{ width: 300 }}
          openOnFocus
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Select a book..."
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
      </Box>
      <Box display="flex" justifyContent="center" m={1} p={1} visibility={(loading === false) ? 'hidden' : 'visible'}>
        <CircularProgress />
      </Box>
      <Box display="flex" justifyContent="center">
        {/* it throws an error for the user if (GET) requests are interepted or didn't complete */}
        { error && <Alert flexShrink={1} severity="error"> There is an error </Alert> }
      </Box>
    </div>
  );
}

AutoSearch.propTypes = {
  bookTitles: PropTypes.arrayOf(PropTypes.any).isRequired,
  searchView: PropTypes.func.isRequired,
  resultVisible: PropTypes.func.isRequired,
  booksInfos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bookTitles: state.initialState.bookNames,
});

const mapDispatchToProps = (dispatch) => ({
  searchView: () => dispatch(searchVisible()),
  resultVisible: () => dispatch(resultsVisible()),
  booksInfos: (info = null, char = null, pov = null) => dispatch(booksInfo(info, char, pov)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoSearch);
