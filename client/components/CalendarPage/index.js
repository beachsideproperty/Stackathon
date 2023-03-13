import React, { useState, useEffect } from 'react';
import calendarVideo from '../../calendarVideo.mp4';
import { Box, Tooltip } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Calendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import theme from '../../theme';
import { fetchAllMoods } from '../../store/slices/moods';

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const moods = useSelector((state) => state.moods.allMoods);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMoods());
  }, [dispatch]);

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const mood = moods.find((mood) => mood.date === formattedDate);

    setSelectedDate(mood ? formattedDate : null);
  };

  const getMoodForDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const mood = moods.find((mood) => mood.date === formattedDate);

    return mood ? mood.mood : null;
  };

  const getTileClassName = ({ date }) => {
    const mood = getMoodForDate(date);
    return mood ? `mood-${mood}` : 'no-mood';
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
            tileContent={({ date }) => {
              const mood = getMoodForDate(date);
              return mood !== null ? (
                <Tooltip
                  title={mood}
                  placement='top'
                  arrow
                  zIndex={999}
                  enterDelay={0}
                >
                  <span>: {mood}</span>
                </Tooltip>
              ) : null;
            }}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default CalendarPage;
