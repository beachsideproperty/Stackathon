import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Calendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMoods } from '../../store/slices/moods';
import { styled } from '@mui/system';

const formatCalendarDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CalendarTile = styled('div')(({ theme }) => ({
  '.react-calendar__tile': {
    width: '4rem',
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '.mood-Elated': { backgroundColor: '#FF69B4' },
  '.mood-Happy': { backgroundColor: '#FF95C0' },
  '.mood-Content': { backgroundColor: '#FFC0CB' },
  '.mood-So-so': { backgroundColor: '#DCDCDC' },
  '.mood-Unhappy': { backgroundColor: '#A9A9A9' },
  '.mood-Despondent': { backgroundColor: '#555555' },
}));

const MoodCalendar = ({ initialValue, onDateChange }) => {
  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const moods = useSelector((state) => state.moods.allMoods);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMoods());
  }, [dispatch]);

  const handleDateChange = (date) => {
    const formattedDate = formatCalendarDate(date);
    const mood = moods.find((mood) => mood.date === formattedDate);

    setSelectedDate(mood ? formattedDate : null);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const getMoodForDate = (date) => {
    const formattedDate = formatCalendarDate(date);
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <CalendarTile>
        <Calendar
          value={value}
          onChange={handleDateChange}
          tileClassName={getTileClassName}
          tileContent={({ date }) => {
            const mood = getMoodForDate(date);
            return mood !== null ? <span>: {mood}</span> : null;
          }}
        />
      </CalendarTile>
    </Box>
  );
};

export default MoodCalendar;
