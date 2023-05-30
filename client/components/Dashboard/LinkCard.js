import React from 'react';
import { Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';

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

export default LinkCard;
