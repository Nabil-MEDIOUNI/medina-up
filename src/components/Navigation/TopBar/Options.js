import React, { useContext } from 'react';
import {
  Delete,
  AddCircleOutline,
  FilterList,
  Visibility,
  PersonAdd,
} from '@material-ui/icons';
import { Box, IconButton } from '@material-ui/core';

import UserInfoContext from '../../UserInfo/UserInfoContext';
import Alert from '../../../utils/alert';
import DeleteModel from './DeleteModel';
import AssigneeModel from './AssigneeModel';

const Options = ({
  showFilter,
  product,
  withSearch,
  setFilter,
  showModelFilter,
  showAddEPModel,
  showSearch,
  setAddEPModel,
  setSeach,
  showAddEp,
  selectedObjects,
  setSelectedObjects,
  deleteMultiple,
  seeMultiple,
  showEye,
  showAssignee,
  setObjects,
  refetchObjects,
  error,
}) => {
  const { data: user, loading } = useContext(UserInfoContext);
  const [openAlert, setAlert] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showAssigneeModal, setAssigneeModal] = React.useState(false);

  if (loading) return '';

  const isLeader = user?.currentPerson.is_tl;
  const isMember = user?.currentPerson.is_member;

  return (
    <Box display="flex" alignItems="center">
      {selectedObjects?.length === 0 && !showSearch && withSearch && (
        <IconButton onClick={() => setSeach(true)}>
          <img
            src="/static/icons/search_icon.svg"
            style={{ width: '1rem' }}
            alt=""
          />
        </IconButton>
      )}

      {selectedObjects?.length > 0 && (
        <>
          <IconButton onClick={() => setShowDeleteModal(true)}>
            <Delete style={{ color: '#29abc4', fontSize: 20 }} />
          </IconButton>
          <DeleteModel
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            error={error}
            setObjects={setObjects}
            refetchObjects={refetchObjects}
            deleteMultiple={deleteMultiple}
            setSelectedObjects={setSelectedObjects}
            ids={selectedObjects}
          />
          {showEye && (
            <IconButton
              onClick={() => seeMultiple({ variables: { ids: selectedObjects } })}
            >
              <Visibility style={{ color: '#29abc4', fontSize: 20 }} />
            </IconButton>
          )}
          {showAssignee && !isMember && (
            <>
              <IconButton onClick={() => setAssigneeModal(true)}>
                <PersonAdd style={{ color: '#29abc4', fontSize: 20 }} />
              </IconButton>
              <AssigneeModel
                product={product}
                ids={selectedObjects}
                setObjects={setObjects}
                refetchObjects={refetchObjects}
                open={showAssigneeModal}
                onClose={() => setAssigneeModal(false)}
              />
            </>
          )}
        </>
      )}

      {!showSearch && showFilter && !isLeader && !isMember && (
        <IconButton onClick={() => setFilter(!showModelFilter)}>
          <FilterList style={{ color: '#29abc4', fontSize: 22 }} />
        </IconButton>
      )}

      {selectedObjects?.length === 0 && showAddEp && product && (
        <IconButton onClick={() => setAddEPModel(!showAddEPModel)}>
          <AddCircleOutline style={{ color: '#29abc4', fontSize: 22 }} />
        </IconButton>
      )}
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'EPS are deleted successfully!',
      )}
    </Box>
  );
};

export default Options;
