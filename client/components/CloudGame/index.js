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
    <Paper sx={{ maxWidth: 'xl', margin: 'auto', p: 1, boxShadow: 'none' }}>
      <Box ref={containerRef} sx={{ width: '100%', height: '75vh' }}></Box>
    </Paper>
  );
};

export default CloudGame;
