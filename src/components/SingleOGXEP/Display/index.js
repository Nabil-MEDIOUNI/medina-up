import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../../_common/Loading';
import LastDiv from '../../_common/LastDiv';

import OpportunityDetails from './OpportunityDetails';
import Notes from './Notes';
import EPInformation from './EPinformation';

const SingleEpDisplay = ({
  singleEP, loading, getSingleEP, setSingleEP,
}) => (
  <>
    {!loading || !navigator.onLine ? (
      <>
        <EPInformation setSingleEP={setSingleEP} getSingleEP={getSingleEP} singleEP={singleEP} />
        <Notes singleEP={singleEP} />
        <OpportunityDetails singleEP={singleEP} />
        <LastDiv height="80px" />
      </>
    ) : (
      <div className="big_loading">
        <Loading height="45px" />
      </div>
    )}
  </>
);

SingleEpDisplay.propTypes = {
  singleEP: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SingleEpDisplay;
