import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import videoClouds from '../../cloudVideo.mp4';

const CloudGame = () => {
  const user = useSelector((state) => state.auth.user);
  const containerRef = useRef(null);

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:3000/game/index.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    const container = containerRef.current;
    container.appendChild(iframe);

    iframe.addEventListener('load', () => {
      console.log('iframe loaded');
      const gameWindow = iframe.contentWindow;
      const gameDoc = gameWindow.document;

      const gameBody = gameDoc.body;
      gameBody.style.position = 'absolute';
      gameBody.style.top = 0;
      gameBody.style.left = 0;
      gameBody.style.width = '100%';
      gameBody.style.height = '100%';
      gameBody.style.margin = 0;

      const gameCanvas = gameDoc.querySelector('canvas');
      gameCanvas.style.position = 'absolute';
      gameCanvas.style.top = 0;
      gameCanvas.style.left = 0;
      gameCanvas.style.width = '100%';
      gameCanvas.style.height = '100%';
      gameCanvas.style.margin = 0;
      gameCanvas.style.padding = 0;
    });

    return () => {
      container.removeChild(iframe);
    };
  }, []);

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
        // '&:before': {
        //   content: '""',
        //   position: 'absolute',
        //   top: 0,
        //   left: 0,
        //   right: 0,
        //   bottom: 0,
        //   backgroundColor: 'rgba(255, 192, 203, 0.2)',
        //   zIndex: 1,
        // },
      }}
    >
      <video
        src={videoClouds}
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
          maxWidth: 'xl',
          p: 1,
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '2rem',
          maxWidth: '800px',
          margin: 'auto',
        }}
      >
        <Box ref={containerRef} sx={{ width: '100%', height: '75vh' }}></Box>
      </Box>
    </Box>
  );
};

export default CloudGame;
