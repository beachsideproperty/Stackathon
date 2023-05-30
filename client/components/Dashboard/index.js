import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import {
  SkipPrevious as SkipPreviousIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  SkipNext as SkipNextIcon,
  SportsCricket as SportsCricketIcon,
  Schedule as ScheduleIcon,
  Create as CreateIcon,
  SelfImprovement as SelfImprovementIcon,
} from '@mui/icons-material';
import oceanVideo from '../../oceanVideo.mp4';
import blonde from '../../blonde.png';
import pink from '../../pink_white.mp3';
import Wrapper from '../style.js';
import LinkCard from './LinkCard';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [audio] = useState(new Audio(pink));
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <Wrapper videoSrc={oceanVideo}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
          marginTop: '40px',
        }}
      >
        <Box
          sx={{
            height: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: 0.8,
          }}
        >
          <Card sx={{ display: 'flex', flex: 1, pb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant='h6' color='secondary' component='div'>
                  {user
                    ? `Welcome back,
                    ${user.firstName}!`
                    : 'Join to create your dashboard'}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: 0.8,
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <LinkCard
                      title='Meditate'
                      icon={<SelfImprovementIcon />}
                      link='/meditate'
                    />
                    <LinkCard
                      title='Mood'
                      icon={<CreateIcon />}
                      link='/journal'
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <LinkCard
                      title='Calendar'
                      icon={<ScheduleIcon />}
                      link='/calendar'
                    />
                    <LinkCard
                      title='Game'
                      icon={<SportsCricketIcon />}
                      link='/cloud'
                    />
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Card>

          <Card sx={{ display: 'flex', flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component='div' variant='h5'>
                  Pink + White
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='div'
                >
                  Frank Ocean
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label='previous'>
                  <SkipPreviousIcon />
                </IconButton>
                <IconButton
                  button='true'
                  aria-label='play/pause'
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <PauseIcon sx={{ height: 38, width: 38 }} />
                  ) : (
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  )}
                </IconButton>
                <IconButton aria-label='next'>
                  <SkipNextIcon />
                </IconButton>
              </Box>
            </Box>
            <CardMedia
              component='img'
              sx={{ width: 151 }}
              image={blonde}
              alt='Frank Ocean - Blonde'
            />
          </Card>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Dashboard;
