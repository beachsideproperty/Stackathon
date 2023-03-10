import React from 'react';
import { Navbar } from './components';
import Router from './Routes';
import { Box } from '@mui/material';

const App = () => {
  return (
    <Box>
      <Navbar />
      <Router />
    </Box>
  );
};

export default App;
