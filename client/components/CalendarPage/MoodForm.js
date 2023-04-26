import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Snackbar, Typography } from '@mui/material';
import { fetchAllMoods, createMood } from '../../store/slices/moods';

const MoodForm = (props) => {
  const { formattedDate } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [selectedMood, setSelectedMood] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (formattedDate) {
      dispatch(fetchAllMoods(formattedDate));
    }
  }, [dispatch, formattedDate]);

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

  const moodButtons = [
    { mood: 'Elated', url: 'https://i.gifer.com/JSQ.gif' },
    {
      mood: 'Happy',
      url: 'https://i.gifer.com/origin/ff/ff95320f2d482b0d3847efd6842c7d39_w200.gif',
    },
    {
      mood: 'Content',
      url: 'https://www.pngkit.com/png/full/349-3491873_hamtaro-pixel-hamster.png',
    },
    {
      mood: 'So-so',
      url: 'https://i.gifer.com/origin/fe/fea01b80b4d059622a8bba8e3e1655fc_w200.gif',
    },
    {
      mood: 'Unhappy',
      url: 'https://i.gifer.com/origin/5e/5e3bb1bffaa326ef4e12916d4e506829_w200.gif',
    },
    {
      mood: 'Despondent',
      url: 'https://64.media.tumblr.com/07ad0e204239ffaa1c17e71e5b74914b/e4b703e2f8b768b6-d6/s400x600/2bcda6d0dfeaffefe9659fbe62aaca57e65da730.gif',
    },
  ];

  return (
    <Box>
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
            {user.firstName}'s Mood:
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
    </Box>
  );
};

export default MoodForm;
