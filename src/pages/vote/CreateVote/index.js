import React, { useContext, useState } from 'react';

import SwipeableDrawer from '@material-ui/core/Drawer';
import {
  Box, Divider, FormControl, Typography,
} from '@material-ui/core';
import { useMutation } from 'react-apollo';
import Axios from 'axios';
import useStyles from './styles';
import Header from './Header';
import PostTextArea from './TextArea';
import Alert from '../../../utils/alert';
import Candidates from './Candidates';
import DatePicker from '../../../components/_common/EditFields/DatePicker';
import EditField from '../../../components/_common/EditFields/EditField';
import { CREATE_VOTE } from '../../../apollo/mutations/vote';
import { ALL_VOTES } from '../../../apollo/queries/votes';
import UserInfoContext from '../../../components/UserInfo/UserInfoContext';
import { ALL_NOTIFICATIONS, GET_UNSEEN_NOTIFICATIONS } from '../../../apollo/queries/notification';

const CreateVote = ({ openVoteModel, setVoteModel }) => {
  const classes = useStyles();
  const { data } = useContext(UserInfoContext);

  const [openAlert, setAlert] = useState(false);
  const [title, setTitle] = useState('');
  const [room, setRoom] = useState('');
  const [location, setLocation] = useState('');
  const [candidates, setCandidate] = React.useState([]);
  const [description, setDescription] = useState('');
  const [post, setpost] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [createVote, { error }] = useMutation(CREATE_VOTE, {
    refetchQueries: [
      { query: ALL_VOTES },
      { query: ALL_NOTIFICATIONS },
      { query: GET_UNSEEN_NOTIFICATIONS },
    ],
  });

  const clear = () => {
    setTitle('');
    setDescription('');
    setCandidate([]);
    setLocation('');
    setpost('');
    setRoom('');
  };

  const submitPost = (e) => {
    e.preventDefault();
    setpost(true);
    createVote({
      variables: {
        vote: {
          title, description, room: { name: room }, location, candidates,
        },
      },
    })
      .then(() => {
        const os_data_1 = JSON.stringify({
          app_id: '7ca60e05-805b-4478-9dcc-e8e54e63531f',
          headings: {
            en: `${data?.currentPerson.full_name} started a vote`,
          },
          contents: {
            en: title,
          },
          chrome_web_icon: data?.currentPerson.cover_photo.url,
          huawei_small_icon: data?.currentPerson.cover_photo.url,
          isAnyWeb: true,
          filters: [
            {
              field: 'tag',
              key: 'is_aiesecer',
              value: true,
            },
          ],
        });
        Axios.post(
          'https://onesignal.com/api/v1/notifications',
          os_data_1,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: process.env.REACT_APP_OS_API,
            },
          },
        );
        setAlert(true);
        setVoteModel(false);
        clear();
      })
      .catch(() => {
        setAlert(true);
        setpost(false);
      });
  };

  return (
    <>
      <SwipeableDrawer
        className={classes.root}
        anchor="bottom"
        open={openVoteModel}
        onClose={() => setVoteModel(false)}
      >
        <Header
          setVoteModel={setVoteModel}
          submitPost={submitPost}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          room={room}
          candidates={candidates}
          setRoom={setRoom}
          post={post}
          setpost={setpost}
          location={location}
          setLocation={setLocation}
          setCandidate={setCandidate}
        />
        <Box className={classes.filterContent} my={3}>
          <PostTextArea
            setTitle={setTitle}
            setDescription={setDescription}
            title={title}
            description={description}
          />
          <Divider />
          <Candidates selectedCandidate={candidates} setCandidate={setCandidate} />
          <Divider />
          <FormControl style={{ margin: 16, width: '85%' }} className={classes.margin}>
            <Typography
              style={{ fontSize: 14, marginBottom: 8 }}
              variant="body1"
            >
              Other Informations
            </Typography>
            <EditField
              margin
              onChange={(e) => setRoom(e.target.value)}
              type="text"
              label="Room name"
              required
            />
            <EditField
              margin
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              label="Accomodation"
              required
            />
            <DatePicker
              handle={handleDateChange}
              label="Date of creation"
              defaultValue={selectedDate}
              selectedDate={selectedDate}
              inputVariant="filled"
            />
          </FormControl>
        </Box>
      </SwipeableDrawer>
      {Alert(error, openAlert, () => setAlert(false), 'vote is created successfully!')}
    </>
  );
};

export default CreateVote;
