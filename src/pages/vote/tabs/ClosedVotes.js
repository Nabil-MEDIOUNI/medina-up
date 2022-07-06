/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useQuery } from 'react-apollo';
import { ALL_VOTES } from '../../../apollo/queries/votes';
import RoomListItem from '../Room/RoomListItem';

const ClosedVotes = ({ value, search }) => {
  const { data, loading } = useQuery(ALL_VOTES, {
    pollInterval: 2000,
  });

  const closedVotes = data?.allVotes.filter((item) => !item.open);
  const rooms = closedVotes?.filter((item) => item.title.toLowerCase().indexOf(search) !== -1);

  return <RoomListItem value={value} index={1} rooms={rooms} loading={loading} />;
};

export default ClosedVotes;
