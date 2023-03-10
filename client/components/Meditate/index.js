import React from 'react';
import Box from '@mui/material/Box';
import Timer from './Timer';
import videoMeditate from '../../snow_meditate.mp4';

const Meditate = () => {
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
        src={videoMeditate}
        autoPlay
        loop
        muted
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <Timer initialMinute={0} initialSeconds={10} />
      </Box>
    </Box>
  );
};

export default Meditate;
