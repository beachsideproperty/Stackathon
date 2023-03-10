import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import laosTree from '../laosTree.png';

export const Main = () => {
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
        backgroundImage: `url(${laosTree})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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
        <Typography>
          {user
            ? `Welcome back, ${user.firstName}!`
            : 'Join to create your dashboard'}
        </Typography>{' '}
      </Box>
    </Box>
  );
};

export default Main;
