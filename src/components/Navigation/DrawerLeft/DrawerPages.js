import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import {
  List,
  Typography,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import isCurrentPage from '../../../utils/others/isCurrentPage';
import useStyles from '../styles';

const ListItems = withStyles({
  root: {
    width: '90%',
    borderRadius: 5,
    margin: '4px auto',
    outline: 'none',
  },
  selected: {},
})(ListItem);

const DrawerPages = ({ pages }) => {
  const classes = useStyles();
  const location = useLocation();

  const checkWithRoute = (page, class1, class2) => (isCurrentPage(location.pathname, page) ? class1 : class2);

  return (
    <List style={{ marginTop: 16 }} component="nav" aria-label="Top Half">
      {pages.map((page) => (
        <Link key={page.link} style={{ textDecoration: 'none' }} to={page.link}>
          <ListItems
            button
            className={checkWithRoute(
              page.link,
              classes.menuButtonActive,
              classes.menuButtonInActive,
            )}
          >
            <ListItemText>
              <Typography
                className={checkWithRoute(
                  page.link,
                  classes.activeTypo,
                  classes.inActiveTypo,
                )}
                variant="body2"
              >
                {page.title}
              </Typography>
            </ListItemText>
          </ListItems>
        </Link>
      ))}
    </List>
  );
};

export default DrawerPages;
