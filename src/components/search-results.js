import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

import BookInfo from './book-info';
import CharInfo from './char-info';
import ResBookInfo from './responsive-book-results';

// helper funtion to calculate the screen width by adding delay,
// to minimize the rerendring rate while the window size changing.
function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments);
    }, ms);
  };
}

function SearchResult(props) {
  const minWidth = 700;
  const { bookInfo, bookChar, bookPovChar } = props;
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });

  const SmScreenView = () => (
    <Box width="100%" height="70vh" display="flex" justifyContent="center">
      <Box height="95%" mx={0.5} width="85%" display="inline-block">
        <ResBookInfo char={bookChar} povChar={bookPovChar} info={bookInfo} />
      </Box>
    </Box>
  );
  const MdlgScreenDView = () => (
    <Box width="100%" height="70vh" display="flex" justifyContent="center">
      <Box height="87%" mx={0.5} width="25%" display="inline-block">
        <BookInfo info={bookInfo} />
      </Box>
      <Box height="90%" mx={0.5} width="50%" display="inline-block">
        <CharInfo char={bookChar} povChar={bookPovChar} />
      </Box>
    </Box>
  );
  return dimensions.width < minWidth ? <SmScreenView /> : <MdlgScreenDView />;
}

SearchResult.propTypes = {
  bookInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  bookChar: PropTypes.node.isRequired,
  bookPovChar: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  bookInfo: state.bookInfo.bookInfo,
  bookChar: state.bookInfo.bookChar,
  bookPovChar: state.bookInfo.bookPovChar,
});

export default connect(mapStateToProps)(SearchResult);
