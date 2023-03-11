import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import oceanVideo from '../oceanVideo.mp4';

export const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

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
        src={oceanVideo}
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
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
          marginTop: '40px',
        }}
      >
        <Typography>
          {user
            ? `Welcome back, ${user.firstName}!`
            : 'Join to create your dashboard'}
        </Typography>{' '}
      </Box>
    </Box>
  );
};

export default Dashboard;
