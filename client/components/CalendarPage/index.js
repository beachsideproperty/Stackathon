import React, { useState } from 'react';
import calendarVideo from '../../calendarVideo.mp4';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import theme from '../../theme';

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const moods = useSelector((state) => state.moods.allMoods);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getMoodForDate = (date) => {
    const mood = moods.find(
      (mood) => mood.date === date.toISOString().slice(0, 10)
    );
    return mood ? mood.mood : null;
  };

  const getTileClassName = ({ date }) => {
    const mood = getMoodForDate(date);
    return mood ? `mood-${mood}` : '';
  };

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
        <ThemeProvider theme={theme}>
          <Calendar
            value={value}
            onChange={handleDateChange}
            tileClassName={getTileClassName}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default CalendarPage;
