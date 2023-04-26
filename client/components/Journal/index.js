import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import calendarVideo from '../../calendarVideo.mp4';

const Journal = () => {
  const user = useSelector((state) => state.auth.user);
  const moods = useSelector((state) => state.moods.moods);
  const dispatch = useDispatch();

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
          marginTop: '40px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
            width: '40vh',
            border: 1,
            borderRadius: 5,
            marginTop: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <Typography variant='overline' fontSize='16px' display='block'>
            Journal:
          </Typography>
          <textarea
            aria-label='empty textarea'
            placeholder='What am I feeling and why?'
            rows={35}
            style={{
              width: '80%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              resize: 'none',
              margin: '10px',
            }}
          />
          <Button variant='outlined' color='secondary'>
            submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Journal;
