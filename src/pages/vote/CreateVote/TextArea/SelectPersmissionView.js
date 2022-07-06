import React, { useState, useContext } from 'react';

import { useOutlineSelectStyles } from '@mui-treasury/styles/select/outline';
import {
  MenuItem, Select, FormControl, ListItemIcon, Box, Typography,
} from '@material-ui/core';
import {
  ExpandMoreRounded, Public,
} from '@material-ui/icons';

import UserInfoContext from '../../../../components/..../../UserInfo/UserInfoContext';
import UserAvatar from '../../../../components/..../../_common/Avatar';
import useStyles from '../styles';


const SelectPersmissionView = () => {
  const classes = useStyles();

  const { data, loading } = useContext(UserInfoContext);

  const [val, setVal] = useState(0);

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const outlineSelectClasses = useOutlineSelectStyles();

  const iconComponent = (props) => (
    <ExpandMoreRounded className={`${props.className} ${outlineSelectClasses.icon}`} />
  );

  // moves the menu below the select input
  const menuProps = {
    classes: {
      paper: outlineSelectClasses.paper,
      list: outlineSelectClasses.list,
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    getContentAnchorEl: null,
  };

  if (loading) return '';

  return (
    <Box mx={2} display="flex" alignItems="center">
      <Box ml={1}>
        <UserAvatar userAvatar size="2.5rem" />
      </Box>
      <Box ml={2}>
        <Typography className={classes.userName}>
          {data?.currentPerson.full_name}
        </Typography>
        <FormControl style={{ border: '1px solid #a9a9a9', borderRadius: 4, outline: 'none' }}>
          <Select
            disableUnderline
            classes={{ root: outlineSelectClasses.select }}
            MenuProps={menuProps}
            IconComponent={iconComponent}
            value={val}
            onChange={handleChange}
          >
            <MenuItem value={0}>
              <ListItemIcon classes={{ root: outlineSelectClasses.listIcon }}>
                <Public />
              </ListItemIcon>
              <span style={{ fontSize: 12, marginTop: 2 }}>
                Local Committee
              </span>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SelectPersmissionView;
