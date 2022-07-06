import React, { useContext, useEffect } from 'react';

import { useOutlineSelectStyles } from '@mui-treasury/styles/select/outline';
import {
  MenuItem,
  Select,
  FormControl,
  ListItemIcon,
  Box,
  Typography,
} from '@material-ui/core';
import {
  ExpandMoreRounded,
  Public,
  Apartment,
  Group,
  School,
} from '@material-ui/icons';

import UserInfoContext from '../../../UserInfo/UserInfoContext';
import UserAvatar from '../../../_common/Avatar';
import useStyles from '../styles';

const SelectPersmissionView = ({ setPosted_to, posted_to }) => {
  const classes = useStyles();

  const { data, loading } = useContext(UserInfoContext);
  const is_lcp = data?.currentPerson.is_lcp;
  const is_eb = data?.currentPerson.is_eb;
  const is_tl = data?.currentPerson.is_tl;
  const is_manager = data?.currentPerson.is_manager;
  const is_alumni = data?.currentPerson.is_alumni;
  const is_admin = data?.currentPerson.is_admin;

  useEffect(() => {
    if (data) {
      if (is_manager || is_tl) {
        setPosted_to('My Team');
      }
      if (is_alumni) {
        setPosted_to('All Alumni');
      }
    }
  }, [data, is_alumni, is_manager, is_tl, setPosted_to]);

  const handleChange = (event) => {
    setPosted_to(event.target.value);
  };

  const outlineSelectClasses = useOutlineSelectStyles();

  const iconComponent = (props) => (
    <ExpandMoreRounded
      className={`${props.className} ${outlineSelectClasses.icon}`}
    />
  );

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

  const post_to = [
    {
      name: 'Local Committee',
      icon: () => <Public />,
      canview: !is_alumni,
    },
    {
      name: 'Only EB',
      icon: () => <Apartment />,
      canview: is_eb || is_lcp,
    },
    {
      name: 'My Department',
      icon: () => <Apartment />,
      canview: is_eb && !is_lcp,
    },
    {
      name: 'My Team',
      icon: () => <Group />,
      canview: is_tl || is_manager,
    },
    {
      name: 'All Alumni',
      icon: () => <School />,
      canview: is_admin || is_alumni,
    },
  ];

  return (
    <Box mx={2} display="flex" alignItems="center">
      <Box ml={1}>
        <UserAvatar userAvatar size="2.5rem" />
      </Box>
      <Box ml={2}>
        <Typography className={classes.userName}>
          {data?.currentPerson.full_name}
        </Typography>
        <FormControl
          style={{
            border: '1px solid #a9a9a9',
            borderRadius: 4,
            outline: 'none',
            marginTop: 4,
          }}
        >
          <Select
            disableUnderline
            classes={{ root: outlineSelectClasses.select }}
            MenuProps={menuProps}
            IconComponent={iconComponent}
            value={posted_to}
            onChange={handleChange}
          >
            {post_to.map(
              (item) => item.canview && (
              <MenuItem key={item.name} value={item.name}>
                <ListItemIcon
                  classes={{ root: outlineSelectClasses.listIcon }}
                >
                  {item.icon()}
                </ListItemIcon>
                <span style={{ fontSize: 12, marginTop: 2 }}>
                  {item.name}
                </span>
              </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SelectPersmissionView;
