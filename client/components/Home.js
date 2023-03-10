import React from 'react';
import videoSnow from '../snow_mountain.mp4';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        '& video': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <video
        src={videoSnow}
        autoPlay
        loop
        muted
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </Box>
  );
};

export default Home;
