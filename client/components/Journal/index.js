import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';
import MoodForm from './MoodForm';
import calendarVideo from '../../calendarVideo.mp4';

const Journal = () => {
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
        src={calendarVideo}
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
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
          marginTop: '40px',
        }}
      >
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
      </Box>
    </Box>
  );
};

export default Journal;
