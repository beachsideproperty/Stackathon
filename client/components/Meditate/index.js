import React from 'react';
import Box from '@mui/material/Box';
import Timer from './Timer';

export const Meditate = () => {
  return (
    <Box>
      <Timer initialMinute={0} initialSeconds={10} />
    </Box>
  );
};

export default Meditate;
