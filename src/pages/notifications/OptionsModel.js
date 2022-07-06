import React from 'react';
import { Typography, MenuItem, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const OptionsModel = ({
  id, deleteNotification, deleteModel, setDeleteModel,
}) => (
  <>
    {deleteModel.model && deleteModel.id === id && (
      <>
        <Box
          style={{
            position: 'absolute',
            right: '2rem',
            background: 'white',
            borderRadius: 4,
            boxShadow: '0px 0px 10px #e8e8e8',
            marginTop: '0.5rem',
            zIndex: 55,
          }}
        >
          <MenuItem
            onClick={() => {
              deleteNotification({
                variables: {
                  id,
                },
              }).then(() => setDeleteModel(false));
            }}
          >
            <Box mr={1} lineHeight={0}>
              <DeleteIcon />
            </Box>
            <Typography variant="caption">delete notification</Typography>
          </MenuItem>
        </Box>
      </>
    )}
  </>
);

export default OptionsModel;
