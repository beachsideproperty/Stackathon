import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';
import MoodForm from './MoodForm';
import calendarVideo from '../../calendarVideo.mp4';
import { fetchAllMoods } from '../../store/slices/moods';
import { format } from 'date-fns';
import MoodCalendar from './MoodCalendar';

const CalendarPage = () => {
  const navigate = useNavigate();
  const [initialValue, setInitialValue] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const user = useSelector((state) => state.auth.user);
  const moods = useSelector((state) => state.moods.moods);
  const dispatch = useDispatch();

  useEffect(() => {
    const formattedDate = format(initialValue, 'yyyy-MM-dd');
    setFormattedDate(formattedDate);
    dispatch(fetchAllMoods(formattedDate));
  }, [initialValue]);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    const newFormattedDate = newValue.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setFormattedDate(newFormattedDate);
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
          margin: '0 auto',
          marginTop: '40px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box>
            <MoodCalendar value={initialValue} onChange={handleDateChange} />
            <MoodForm formattedDate={formattedDate} />
          </Box>
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default CalendarPage;
