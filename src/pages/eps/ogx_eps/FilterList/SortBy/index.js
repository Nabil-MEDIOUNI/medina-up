import React from 'react';

import Radio from '@material-ui/core/Radio';

import {
  Box, Typography,
} from '@material-ui/core';


const SortBy = () => {
  const [selectedValue, setSelectedValue] = React.useState('recent');

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box mx={2}>
      <Box mb={1}>
        <Typography variant="caption" style={{ fontWeight: 700 }}>Sort by</Typography>
      </Box>
      <Box width="100%">
        <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
          <Typography variant="caption">Most recent</Typography>
          <Radio
            checked={selectedValue === 'recent'}
            onChange={handleRadioChange}
            value="recent"
            name="radio-button-demo"
          />
        </Box>
        <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
          <Typography variant="caption">Most relevent</Typography>
          <Radio
            checked={selectedValue === 'relevent'}
            onChange={handleRadioChange}
            value="relevent"
            name="radio-button-demo"
          />
        </Box>
      </Box>
    </Box>

  );
};

export default SortBy;
