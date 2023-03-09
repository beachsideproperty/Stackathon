import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Box from '@mui/material/Box';

const CalendarPage = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Box>
      <Calendar onChange={onChange} value={value} />
    </Box>
  );
};

export default CalendarPage;
