import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function CharNames(props) {
  const { charNames } = props;
  const classes = useStyles();

  return (
    // .map is so much faster than for..loop or foreach()
    <div className={classes.root}>
      {charNames.map((data) => (
        (data[0].length >= 1
          ? (
            <Tooltip key={data} title={data[1]} placement="bottom">
              <Chip key={data} label={data[0]} color="primary" />
            </Tooltip>
          )
          : (
            <Tooltip key={data} title={data[1]} placement="bottom">
              <Chip key={data} label="N/A" color="primary" />
            </Tooltip>
          )
        )))}
    </div>
  );
}

CharNames.propTypes = {
  charNames: PropTypes.node.isRequired,
};

export default CharNames;
