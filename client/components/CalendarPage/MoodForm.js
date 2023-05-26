import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Snackbar, Typography } from '@mui/material';
import { createMood } from '../../store/slices/moods';
import { moodButtons } from './moodTools';

const MoodForm = (props) => {
  const { formattedDate } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [selectedMood, setSelectedMood] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleMoodClick = (mood) => {
    setSnackbarOpen(true);
    setSelectedMood(mood);
    dispatch(
      createMood({
        date: formattedDate,
        mood: mood,
        userId: user.id,
      })
    );
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={1500}
          onClose={() => setSnackbarOpen(false)}
          message='Submitted!'
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      </Box>
    </Box>
  );
};

export default MoodForm;
