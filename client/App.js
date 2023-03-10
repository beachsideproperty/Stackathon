import React from 'react';
import { Navbar } from './components';
import Router from './Routes';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ height: '100vh', color: 'secondary.main2', paddingTop: '64px' }}
      >
        <Navbar />
        <Router />
      </Box>
    </ThemeProvider>
  );
};

export default App;
