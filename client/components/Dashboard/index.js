import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import oceanVideo from '../../oceanVideo.mp4';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import blonde from '../../blonde.png';
import pink from '../../pink_white.mp3';
import { Link } from 'react-router-dom';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CreateIcon from '@mui/icons-material/Create';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import Wrapper from '../style.js';

const LinkCard = ({ title, icon, link }) => (
  <Card
    sx={{
      width: { xs: '50%', md: 'auto' },
      m: 1,
      borderRadius: '10px',
    }}
  >
    <CardContent
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        pt: 2,
      }}
    >
      {icon}
      <Link to={link} style={{ textDecoration: 'none' }}>
        <Typography
          variant='h6'
          component='div'
          sx={{ ml: 1, color: '#7c9246' }}
        >
          {title}
        </Typography>
      </Link>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const [audio] = useState(new Audio(pink));
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
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
