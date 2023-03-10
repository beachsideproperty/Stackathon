import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

export const Main = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <Box>
      <Typography>
        {user ? `Welcome back, ${user.firstName}!` : 'Browse all products'}
      </Typography>
    </Box>
  );
};

export default Main;
