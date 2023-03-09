import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../store';
import { removeUserToken } from '../../utils';

//drawer elements used
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import AppsIcon from '@mui/icons-material/Apps';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const StyledHamburgerMenu = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

//search as JSX
const search = (
  <StyledSearch>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder='Suchen…'
      inputProps={{ 'aria-label': 'search' }}
    />
  </StyledSearch>
);

export default function HamburgerMenu(props) {
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

  const closeDrawer = () => {
    setOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <StyledHamburgerMenu>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='open drawer'
        onClick={() => toggleDrawer(true)}
        sx={{
          mr: 2,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor='left'
        open={open}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <Box
          sx={{
            p: 2,
            height: 1,
            backgroundColor: '#dbc8ff',
          }}
        >
          <IconButton sx={{ mb: 2 }} onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mb: 2 }}>
            <ListItemButton button onClick={() => handleNavigation('/main')}>
              <ListItemIcon>
                <AppsIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <WatchLaterIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary='Calendar' />
            </ListItemButton>

            <ListItemButton button onClick={() => handleNavigation('/cloud')}>
              <ListItemIcon>
                <SportsCricketIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary='Cloud Click' />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <FolderIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary='Other' />
            </ListItemButton>
          </Box>

          {search}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translate(-50%, 0)',
            }}
          >
            <Button variant='contained' sx={{ m: 1, width: 0.5 }}>
              Randomize
            </Button>
            {user ? (
              <Button
                variant='outlined'
                onClick={() => {
                  dispatch(setUser(null));
                  removeUserToken();
                  navigate('/');
                }}
                sx={{ m: 1, width: 0.5 }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant='outlined'
                component={Link}
                to='/login'
                sx={{ m: 1, width: 0.5 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </StyledHamburgerMenu>
  );
}
