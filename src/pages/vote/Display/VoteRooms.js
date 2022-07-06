import React, { useState } from 'react';
import {
  AppBar, Box, Tab, Tabs,
} from '@material-ui/core';

import useStyles from '../styles';
import OngoingVotes from '../tabs/OngoingVotes';
import LastDiv from '../../../components/_common/LastDiv';
import ClosedVotes from '../tabs/ClosedVotes';
import Navigation from '../../../components/Navigation';

const VoteRooms = () => {
  const classes = useStyles();

  const [search, setSearch] = useState('');
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        position="fixed"
        bgcolor="#f7f7f7"
        width="100%"
        height="100vh"
        zIndex={0}
      />
      <div className={classes.root}>
        <AppBar className={classes.tapBar} position="fixed">
          <Tabs variant="scrollable" value={value} onChange={handleChange}>
            <Tab label="Ongoing POLLS" />
            <Tab label="Closed POLLS" />
          </Tabs>
        </AppBar>
        <ClosedVotes search={search?.toLowerCase()} value={value} />
        <OngoingVotes search={search?.toLowerCase()} value={value} />
      </div>
      <Navigation
        showBoxShadow={false}
        fixTopBar
        withTopBar
        withSearch
        placeholder="rooms"
        title="Available Rooms"
        search={search}
        setSearch={setSearch}
      />
      <LastDiv />
    </>
  );
};

export default VoteRooms;
