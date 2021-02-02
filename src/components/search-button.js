import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styling/search-button.css';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { searchVisible, resultsVisible } from '../redux/actions/visibility';

import { ReactComponent as Lannister } from '../images/GOT-lannister.svg';

const useStyles = makeStyles({
  root: {
    padding: '0',
  },
});

function SearchButton(props) {
  const classes = useStyles();
  const {
    bool, searchView, resultVisible,
  } = props;

  return (
    // Tooltip throws a warning, for the disabled button,
    // the way Tooltip behaves is fine. it is meant for it to mention what is this button for,
    // when you navigate away from the autocomplete.
    <Tooltip title="Search" placement="bottom">
      <IconButton
        disabled={bool}
        aria-label="search"
        classes={{
          root: classes.root,
        }}
        onClick={() => {
          resultVisible();
          searchView();
        }}
      >
        <Lannister className="svgs" />
      </IconButton>
    </Tooltip>
  );
}

SearchButton.propTypes = {
  bool: PropTypes.bool.isRequired,
  searchView: PropTypes.func.isRequired,
  resultVisible: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  searchView: () => dispatch(searchVisible()),
  resultVisible: () => dispatch(resultsVisible()),
});

export default connect(null, mapDispatchToProps)(SearchButton);
