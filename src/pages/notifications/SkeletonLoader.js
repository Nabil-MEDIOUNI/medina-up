import React from 'react';

import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '../../components/_common/Divider';

const SkeletonLoader = () => (
  <>
    <Box display="flex" bgcolor="white" p="8px 12px" borderRadius="4px">
      <Box mr={2}>
        <Skeleton variant="circle" width={40} height={40} />
      </Box>
      <Box width="100%" mb={2}>
        <Skeleton width="60%" />
        <Skeleton width="80%" />
      </Box>
    </Box>
    <Divider opacity={0.2} marginTop={0} height={0.5} />
  </>
);

export default SkeletonLoader;
