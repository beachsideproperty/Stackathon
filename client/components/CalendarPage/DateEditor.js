import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CalendarPage = () => {
  const [value, onChange] = useState(new Date());

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <DatePicker
          label='Pick a date'
          value={value}
          onChange={handleDateChange}
          textFieldProps={{ variant: 'outlined' }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CalendarPage;
