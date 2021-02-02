import React from 'react';
import PropTypes from 'prop-types';

import '../styling/book-info.css';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import BookMedia from '../images/GOT.jpg';
import { ReactComponent as Authors } from '../images/GOT-authors.svg';
import { ReactComponent as Pages } from '../images/GOT-pages.svg';
import { ReactComponent as Publisher } from '../images/GOT-publisher.svg';
import { ReactComponent as Country } from '../images/GOT-country.svg';
import { ReactComponent as Media } from '../images/GOT-media.svg';
import { ReactComponent as Released } from '../images/GOT-released.svg';

const useStyles = makeStyles(() => ({
  card: {
    paddingTop: 0,
    '&:last-child': {
      paddingBottom: 12,
    },
  },
  list: {
    padding: 0,
  },
  listItems: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  media: {
    height: '7em',
  },
}));
const parseDate = (date) => {
  if (typeof date !== 'undefined') {
    const d = new Date(date);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/New_York',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return d.toLocaleDateString('en-US', options);
  }
  return '';
};

function BookInfo(props) {
  const {
    info: {
      name,
      authors,
      isbn,
      numberOfPages,
      publisher,
      country,
      mediaType,
      released,
    },
  } = props;
  const classes = useStyles();
  const authorsArr = typeof authors === 'undefined' ? ' ' : authors.join(', ');
  const relDate = parseDate(released);

  return (
    <Card style={{ maxHeight: '100%', overflow: 'auto' }}>
      <CardMedia
        className={classes.media}
        image={BookMedia}
        title="GOT"
      />
      <CardHeader
        title={name}
        subheader={`ISBN: ${isbn}`}
      />

      <CardContent className={classes.card}>
        <List className={classes.list}>

          <ListItem alignItems="flex-start" className={classes.listItems}>
            <ListItemIcon>
              <Authors className="svgI" />
            </ListItemIcon>
            <ListItemText primary="Authors" secondary={authorsArr} />
          </ListItem>
          <ListItem alignItems="flex-start" className={classes.listItems}>
            <ListItemIcon>
              <Pages className="svgI" />
            </ListItemIcon>
            <ListItemText primary="Number of Pages" secondary={numberOfPages} />
          </ListItem>
          <ListItem alignItems="flex-start" className={classes.listItems}>
            <ListItemIcon>
              <Publisher className="svgI" />
            </ListItemIcon>
            <ListItemText primary="Publisher" secondary={publisher} />
          </ListItem>
          <ListItem alignItems="flex-start" className={classes.listItems}>
            <ListItemIcon>
              <Country className="svgI" />
            </ListItemIcon>
            <ListItemText primary="Country" secondary={country} />
          </ListItem>
          <ListItem alignItems="flex-start" className={classes.listItems}>
            <ListItemIcon>
              <Media className="svgI" />
            </ListItemIcon>
            <ListItemText primary="Media Type" secondary={mediaType} />
          </ListItem>
          <ListItem alignItems="flex-start" className={classes.listItems}>
            <ListItemIcon>
              <Released className="svgI" />
            </ListItemIcon>
            <ListItemText primary="Released" secondary={relDate} />
          </ListItem>

        </List>
      </CardContent>
    </Card>
  );
}

BookInfo.propTypes = {
  info: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BookInfo;
