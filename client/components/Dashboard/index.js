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
} from '@mui/icons-material';
import oceanVideo from '../../oceanVideo.mp4';
import blonde from '../../blonde.png';
import pink from '../../pink_white.mp3';
import Wrapper from '../style.js';
import { LinkCard, linkCardsData } from './LinkCard';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [audio] = useState(new Audio(pink));
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  const createIconButton = (label, handleClick, icon) => (
    <IconButton aria-label={label} onClick={handleClick}>
      {icon}
    </IconButton>
  );

  const createTypography = (variant, color, component, text) => (
    <Typography variant={variant} color={color} component={component}>
      {text}
    </Typography>
  );

  return (
    <Wrapper videoSrc={oceanVideo}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: 0.8,
          }}
        >
          <Box
            sx={{ display: 'flex', flex: 1, border: '2px solid black', mb: 4 }}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography
                variant='button'
                color='white'
                component='div'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  textShadow: '3px 3px 0 black',
                }}
              >
                Welcome back, {user.firstName}!
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  opacity: 0.8,
                }}
              >
                {linkCardsData.map((card) => (
                  <LinkCard
                    key={card.title}
                    title={card.title}
                    icon={card.icon}
                    link={card.link}
                  />
                ))}
              </Box>
            </CardContent>
          </Box>

          <Card sx={{ display: 'flex', flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                {createTypography('h5', null, 'div', 'Pink + White')}
                {createTypography(
                  'subtitle1',
                  'text.secondary',
                  'div',
                  'Frank Ocean'
                )}
                <Box
                  sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
                >
                  {createIconButton('previous', null, <SkipPreviousIcon />)}
                  {createIconButton(
                    'play/pause',
                    handlePlayPause,
                    isPlaying ? (
                      <PauseIcon sx={{ height: 38, width: 38 }} />
                    ) : (
                      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    )
                  )}
                  {createIconButton('next', null, <SkipNextIcon />)}
                </Box>
              </CardContent>
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
