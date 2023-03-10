import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import HamburgerMenu from './HamburgerMenu.js';
import { setUser } from '../../store';
import { removeUserToken } from '../../utils';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(!open);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          zIndex: 1,
          boxShadow: 'none',
        }}
        elevation={0}
      >
        <Toolbar>
          <HamburgerMenu toggleDrawer={toggleDrawer} />
          <IconButton
            sx={{ color: '#FFFFFF', opacity: 1 }}
            onClick={() => navigate('/')}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            progression of chords
          </Typography>
          {user ? (
            <Button
              color='inherit'
              onClick={() => {
                dispatch(setUser(null));
                removeUserToken();
                navigate('/');
              }}
            >
              Logout
            </Button>
          ) : (
            <Button color='inherit' onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
