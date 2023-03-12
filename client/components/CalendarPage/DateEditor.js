import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';
import MoodForm from '../Journal/MoodForm';

const DateEditor = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const user = useSelector((state) => state.auth.user);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    const formattedDate = newValue.toISOString().slice(0, 10);
  };

  if (!user) {
    navigate('/');
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <DatePicker
          label='Pick a date'
          value={value}
          onChange={handleDateChange}
          textFieldProps={{ variant: 'outlined' }}
        />
        <MoodForm />
      </Box>
    </LocalizationProvider>
  );
};

export default DateEditor;
