/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useQuery } from 'react-apollo';
import { ALL_VOTES } from '../../../apollo/queries/votes';
import RoomListItem from '../Room/RoomListItem';

const OngoingVotes = ({ value, search }) => {
  const { data, loading } = useQuery(ALL_VOTES, {
    pollInterval: 2000,
  });

  const openedVotes = data?.allVotes.filter((item) => item.open);
  const rooms = openedVotes?.filter((item) => item.title.toLowerCase().indexOf(search) !== -1);

  return <RoomListItem value={value} index={0} rooms={rooms} loading={loading} />;
};

export default OngoingVotes;
