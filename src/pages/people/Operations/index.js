import React from 'react';

import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

const Operations = ({
  showDeleteModal, setShowAddModal,
  showAddModal, showModel, updatePerson, setModel, setShowDeleteModal, deletePerson, updateError,
}) => (
  <>
    {(showAddModal && showModel.id) && (
      <EditUser
        title="Update User"
        onClose={() => setShowAddModal(false)}
        open={showAddModal}
        close={setModel}
        updatePerson={updatePerson}
        updateError={updateError}
        id={showModel.id}
      />
    )}
    {(showDeleteModal && showModel.id)
      && (
      <DeleteUser
        onClose={() => setShowDeleteModal(false)}
        open={showDeleteModal}
        deletePerson={deletePerson}
        id={showModel.id}
        close={setModel}
      />
      )}
  </>
);


export default Operations;
