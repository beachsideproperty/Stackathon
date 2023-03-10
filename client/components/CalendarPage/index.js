import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Box from '@mui/material/Box';
import ocean from '../../ocean.png';

const CalendarPage = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        backgroundImage: `url(${ocean})`,
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
        <Calendar onChange={onChange} value={value} />
      </Box>
    </Box>
  );
};

export default CalendarPage;
