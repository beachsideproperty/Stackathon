import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import UndoIcon from '@mui/icons-material/Undo';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import Typography from '@mui/material/Typography';

const Timer = (props) => {
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [runTimer, setRunTimer] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    let myInterval;
    if (runTimer) {
      myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
            setTimerFinished(true);
            setRunTimer(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, seconds, runTimer]);

  const resetTimer = () => {
    setMinutes(initialMinute);
    setSeconds(initialSeconds);
    setRunTimer(false);
    setTimerFinished(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #00bcd4, #4caf50)',
      }}
    >
      {timerFinished ? (
        <SelfImprovementIcon size='large' sx={{ color: 'secondary.main2' }} />
      ) : (
        <Typography
          variant='h1'
          sx={{
            fontFamily: 'Roboto',
            fontSize: '6rem',
            color: 'white',
            textShadow: '2px 2px #000000',
            textAlign: 'center',
            margin: '0',
          }}
        >
          {' '}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Typography>
      )}

      <Tooltip title={runTimer ? 'Pause' : 'Play'}>
        <IconButton
          aria-label='play'
          onClick={() => setRunTimer((prevState) => !prevState)}
          color='secondary'
          size='large'
        >
          {runTimer ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip title='Play music'>
        <IconButton
          aria-label='music'
          sx={{ color: 'triadic.main1' }}
          size='large'
        >
          <HeadphonesIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Reset'>
        <IconButton
          aria-label='reset'
          onClick={resetTimer}
          sx={{ color: 'analogous.main2' }}
          size='large'
        >
          <UndoIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Timer;
