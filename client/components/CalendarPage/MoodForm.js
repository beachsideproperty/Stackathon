import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { createMood, deleteMood } from '../../store/slices/moods';
import { moodButtons } from './moodTools';

const MoodForm = ({ formattedDate, selectedMood, setSelectedMood }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const moods = useSelector((state) => state.moods.allMoods);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    dispatch(
      createMood({
        date: formattedDate,
        mood: mood,
        userId: user.id,
      })
    );
  };

  const handleClearMood = () => {
    setSelectedMood(null);
    const moodToDelete = moods.find(
      (mood) => mood.date === formattedDate && mood.userId === user.id
    );
    if (moodToDelete) {
      dispatch(deleteMood({ id: moodToDelete.id }));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '8rem',
        border: 1,
        borderRadius: 5,
        marginTop: 5,
        padding: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='overline'
          display='block'
          fontSize='16px'
          gutterBottom
        >
          {user.firstName}'s Mood for {formattedDate}:
        </Typography>
        {selectedMood && (
          <img
            src={moodButtons.find((item) => item.mood === selectedMood).url}
            alt={selectedMood}
            width='100'
            height='100'
          />
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        {moodButtons.map((item) => (
          <Button
            key={item.mood}
            variant='outlined'
            color='secondary'
            onClick={() => handleMoodClick(item.mood, item.url)}
          >
            {item.mood}
          </Button>
        ))}
        <Button variant='outlined' color='secondary' onClick={handleClearMood}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default MoodForm;
