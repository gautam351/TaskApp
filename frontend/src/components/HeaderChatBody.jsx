import { React, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Sidenav from "./Sidenav"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const HeaderChatBody = () => {
  const {groups,currGrp} =useSelector((state)=>state.group)

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
                    <Toolbar disableGutters style={{ display: "flex" }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            // href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            style={{ flex: "0.7" }}
                        >
                            <Avatar
                                className="avatar"
                                src="https://lh3.googleusercontent.com/a-/AOh14GjnQC-DpBbVewq6ax2f4uVIs2SZgE3HlJvfw4ompQ=s96-c"
                            > </Avatar>
                          <span style={{alignSelf:"center",marginLeft:"5px"}}> { currGrp?.groupName?.toUpperCase()}</span>
                        </Typography>
                        
                       
                        <div style={{ flex: "0.3", justifyContent: "flex-end", display: 'flex',gap:"10px" }}>
                            <span style={{ cursor: "pointer" }}
                                // onClick={(e) => HandleLogOut()}
                            >
                                <Avatar >
                                    <MoreVertIcon />
                                </Avatar>
                            </span>
                            <span style={{ cursor: "pointer" }} onClick={(e) => HandleLogOut()}>
                                <Avatar >
                                    <ExitToAppIcon />
                                </Avatar>
                            </span>
                        </div>

                    </Toolbar>
                </Container>
            </AppBar>

        </>
    )
}

export default HeaderChatBody