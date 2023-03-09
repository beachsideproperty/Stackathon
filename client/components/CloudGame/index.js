import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const CloudGame = () => {
  const user = useSelector((state) => state.auth.user);
  const containerRef = useRef(null);

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:3000/game/index.html';
    iframe.width = 800;
    iframe.height = 480;
    iframe.style.border = 'none';

    const container = containerRef.current;
    container.appendChild(iframe);

    iframe.addEventListener('load', () => {
      console.log('iframe loaded');
    });

    return () => {
      container.removeChild(iframe);
    };
  }, []);

  return (
    <Paper sx={{ maxWidth: '960px', margin: 'auto', p: 2 }}>
      <Box id='pixi-canvas-container' ref={containerRef}></Box>
    </Paper>
  );
};

export default CloudGame;
