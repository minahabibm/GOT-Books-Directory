import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styling/char-info.css';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListSubheader from '@material-ui/core/ListSubheader';

import { ReactComponent as PChar } from '../images/GOT-js.svg';
import { ReactComponent as Char } from '../images/GOT-md.svg';
import CharNames from './char-names';

const useStyles = makeStyles(() => ({
  subheader: {
    padding: 0,
  },
  paper: {
    textAlign: 'center',
    height: '100%',
    minHeight: '52vh',
    color: 'theme.palette.text.secondary',
  },
}));

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {value === index && (
      <div>
        <div>{children}</div>
      </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function CharInfo(props) {
  const { char, povChar } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ maxHeight: '100%', overflow: 'auto' }}>
      <ListSubheader color="inherit" inset={false} className={classes.subheader}>
        <Paper variant="outlined" square style={{ position: '-webkit-sticky' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            centered
            aria-label="icon label tabs"
          >
            <Tab icon={<Char className="svgc" />} label="Characters" />
            <Tab icon={<PChar className="svgc" />} label="POV Characters" />
          </Tabs>
        </Paper>
      </ListSubheader>
      <Paper square className={classes.paper}>
        <TabPanel value={value} index={0}>
          <CharNames charNames={char} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CharNames charNames={povChar} />
        </TabPanel>
      </Paper>
    </div>
  );
}

CharInfo.propTypes = {
  char: PropTypes.node.isRequired,
  povChar: PropTypes.node.isRequired,
};

export default CharInfo;
