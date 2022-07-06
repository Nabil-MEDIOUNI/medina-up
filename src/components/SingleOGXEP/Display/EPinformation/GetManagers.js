import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo';
import { Avatar, Box, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import useStyles from '../../../../pages/eps/ogx_eps/styles';
import Field from '../../../_common/Field/Field';
import SetManager from '../../Operations/SetManager';

import { ALL_TEAMS_RESPONSIBLE, ALL_MANAGERS } from '../../../../apollo/queries/eps/ogx-eps';
import { SendNotificationForEPManager } from '../../Operations/SendNotification';
import {
  SET_EP_MANAGER,
  SET_EP_TEAM_RESPONSIBLE,
} from '../../../../apollo/mutations/ep';
import UserInfoContext from '../../../UserInfo/UserInfoContext';

const GetManagers = ({ singleEP, getSingleEP, setSingleEP }) => {
  const classes = useStyles();
  const [openManagerModel, setManagerModel] = useState(false);
  const [openResponsibleModel, setResponsibleModel] = useState(false);
  const [openAutocompleteManagers, setOpenManagers] = useState(false);
  const [openAutocompleteResponsible, setOpenResponsible] = useState(false);

  const product = sessionStorage.getItem('FILTER_EPS_PRODUCT');
  const [setEPManager] = useMutation(SET_EP_MANAGER);
  const [setTeamResponsible] = useMutation(SET_EP_TEAM_RESPONSIBLE);
  const { data: user } = useContext(UserInfoContext);

  const { data: allTeamResponsible } = useQuery(ALL_TEAMS_RESPONSIBLE, {
    variables: {
      product,
    },
  });
  const { data: allManagers } = useQuery(ALL_MANAGERS, {
    variables: {
      product,
    },
  });

  return (
    <Box display="flex" flexDirection="row">
      <Box className={classes.wrapBox} flex="0 50%">
        <Field text="Team Responsible" />
        <Box
          onClick={() => setResponsibleModel(true)}
          display="flex"
          alignItems="center"
          ml={0.75}
        >
          {singleEP.TeamResponsible && (
            <Avatar className={classes.managerAvatar}>
              <img
                alt=""
                className={classes.managerImg}
                src={singleEP?.TeamResponsible?.cover_photo.url}
              />
            </Avatar>
          )}
          <Box ml={singleEP.TeamResponsible?.full_name ? 1 : 0} width="100%" whiteSpace="nowrap">
            <Typography className={classes.EPcontent}>
              {singleEP.TeamResponsible?.full_name || <AddCircleOutlineIcon />}
            </Typography>
          </Box>
        </Box>
        {user.currentPerson.is_eb && (
          <SetManager
            data={allTeamResponsible?.allTeamResponsible}
            setManager={setTeamResponsible}
            currentEP={singleEP}
            label="Team Responsible"
            title="a Team Responsible"
            singleEP={singleEP}
            open={openResponsibleModel}
            onClose={() => setResponsibleModel(false)}
            openautocomplete={openAutocompleteResponsible}
            setOpen={setOpenResponsible}
            notificationFunction={SendNotificationForEPManager}
            getSingleEP={getSingleEP}
            setSingleEP={setSingleEP}
          />
        )}
      </Box>
      <Box className={classes.wrapBox} flex="0 50%">
        <Field text="EP Manager" />
        <Box
          onClick={() => setManagerModel(true)}
          display="flex"
          alignItems="center"
          ml={0.75}
        >
          {singleEP.EPManager && (
            <Avatar className={classes.managerAvatar}>
              <img
                alt=""
                className={classes.managerImg}
                src={singleEP.EPManager?.cover_photo.url}
              />
            </Avatar>
          )}
          <Box ml={singleEP.EPManager?.full_name ? 1 : 0} width="100%" whiteSpace="nowrap">
            <Typography className={classes.EPcontent}>
              {singleEP.EPManager?.full_name || <AddCircleOutlineIcon />}
            </Typography>
          </Box>
        </Box>
      </Box>
      {!user.currentPerson.is_member && (
        <SetManager
          data={allManagers?.allManagers}
          setManager={setEPManager}
          currentEP={singleEP}
          label="EP Manager"
          title="an EP Manager"
          singleEP={singleEP}
          open={openManagerModel}
          onClose={() => setManagerModel(false)}
          openautocomplete={openAutocompleteManagers}
          setOpen={setOpenManagers}
          notificationFunction={SendNotificationForEPManager}
          getSingleEP={getSingleEP}
          setSingleEP={setSingleEP}
        />
      )}
    </Box>
  );
};

GetManagers.propTypes = {
  singleEP: PropTypes.object.isRequired,
};

export default GetManagers;
