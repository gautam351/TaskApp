import { React, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Sidenav from "./Sidenav"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';



const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleNavBar = () => {
    setOpen(!open);
  }

  const HandleLogOut = () => {
    sessionStorage.clear();
    navigate("/login");
  }
  return (
    <>
      {/* sidebar */}
      <Sidenav open={open} toggleNavBar={toggleNavBar} />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{ display: "flex", justifyContent: 'space-between' }}>
            <span style={{ cursor: 'pointer' }} onClick={(e) => { setOpen(true); console.log(open); }}> <Avatar> <MenuIcon /></Avatar> </span>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TASK APP
            </Typography>
            <span style={{cursor:"pointer"}} onClick={(e)=>HandleLogOut()}>
              <Avatar >
              <ExitToAppIcon />
              </Avatar>
            </span>
          </Toolbar>
        </Container>
      </AppBar>

    </>
  )
}

export default Header