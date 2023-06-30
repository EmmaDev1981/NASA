import React from "react";
import {connect} from 'react-redux'
import {signOUT, resetLogin} from '../../Store/actions'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

function NavBar({favorites, userLogged, signOUT, resetLogin}) {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const iconStyle = { 
    my: 2, 
    color: 'inherit',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2'}, 
    textDecoration: 'none', 
    display: 'block', 
    fontSize: 18 
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  var favItems = 0;
  if(favorites !== 'undefined' && favorites.length > 0) {
    favItems = favorites.length
  }

  const handleSignOut = () => {
    signOUT()
    resetLogin()
    navigate('/home')
    handleLogoutMessage()
  }

    //toast "Logout message"
    const { enqueueSnackbar } = useSnackbar();
    const handleLogoutMessage = () => {
      enqueueSnackbar(`GOOD BYE!!!!`, {
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        TransitionComponent: Slide,
        variant: "info",
      });
    };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RocketLaunchIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'red' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            NASA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => navigate('/home')}>
                <Typography textAlign="center">ROVERS</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate('/apod')}>
                <Typography textAlign="center">APOD</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate('/epic')}>
                <Typography textAlign="center">EPIC</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate('/favorites')}>
                <Typography textAlign="center">{`FAVORITES(${favItems})`}</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate('/about')}>
                <Typography textAlign="center">ABOUT</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate('/signup')}>
                <Typography textAlign="center">LOGIN</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <RocketLaunchIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'red' }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'red',
              textDecoration: 'none',
            }}
          >
            NASA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => navigate('/home')}
              sx={iconStyle}
            >
              ROVERS
            </Button>
            <Button
              onClick={() => navigate('/apod')}
              sx={iconStyle}
            >
              APOD
            </Button>
            <Button
              onClick={() => navigate('/epic')}
              sx={iconStyle}
            >
              EPIC
            </Button>
            <Button
              onClick={() => navigate('/favorites')}
              sx={iconStyle}
            >
              {`FAVORITES(${favItems})`}
            </Button>
            <Button
              onClick={() => navigate('/about')}
              sx={iconStyle}
            >
              ABOUT
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              sx={iconStyle}
            >
              LOGIN
            </Button>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    userLogged: state.userLogged
  }
}

export default connect(mapStateToProps, {signOUT, resetLogin}) (NavBar)
