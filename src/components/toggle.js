import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styling/toggle.css';
import { makeStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';

import selectTheme from '../redux/actions/theme-selection';

import { ReactComponent as StarkDark } from '../images/GOT-stark-dark.svg';
import { ReactComponent as StarkLight } from '../images/GOT-stark-light.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 47,
    height: 25,
    padding: 0,
    margin: theme.spacing(0),
  },
  switchBase: {
    padding: 3,
  },
  track: {
    borderRadius: 26 / 2,
    transition: theme.transitions.create(['background-color', 'border']),
  },
}));

function Toggle(props) {
  const { darkThemeEnabled } = props;
  const classes = useStyles();
  return (
    <div>
      <Switch
        checked={darkThemeEnabled}
        icon={<StarkLight className="svg" />}
        checkedIcon={<StarkDark className="svg" />}
        color="primary"
        onChange={() => { props.selectTheme(); }}
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          track: classes.track,
        }}
      />
    </div>
  );
}

Toggle.propTypes = {
  darkThemeEnabled: PropTypes.bool.isRequired,
  selectTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  darkThemeEnabled: state.selectTheme.theme,
});
const mapDispatchToProps = (dispatch) => ({
  selectTheme: () => dispatch(selectTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
