import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import RateReviewIcon from '@mui/icons-material/RateReview';
import GroupsIcon from '@mui/icons-material/Groups';
import Dashboard from '@mui/icons-material/Dashboard';
import { Avatar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';


const Sidenav = (props) => {
  const navigate = useNavigate();
  
  const location = useLocation().pathname;

  console.log(location);
  

    const items = [
        { text: "Boards", navigate: "/dashboard" ,icon:<Dashboard/> },
        { text: "Groups", navigate: "/groups/0"   ,icon:<GroupsIcon/>},
        { text: "Feedback", navigate: "#" ,icon:<RateReviewIcon/>},
        { text: "Settings", navigate: "#" ,icon:<SettingsIcon/>},

    ]


    const DrawerList = (
        <Box sx={{ width: 250  }} marginTop={'10vh'} padding={'20px'} role="presentation" onClose={(e)=> props.toggleNavBar(false)} >
           
            
            <List style={{ padding: "20px" }}>

              
            
                {items.map((e,indx) => {
                    return (
                        <span key={indx}>
                             <ListItem  disablePadding  onClick={(evt)=>navigate(e.navigate)}  >
                        <ListItemButton  style={{backgroundColor:location==e.navigate?"#1976D2":"",color:location==e.navigate?"white":""}}>
                                <ListItemIcon>
                                    {e.icon}
                          </ListItemIcon>
                          <ListItemText  primary={e.text}  />
                        </ListItemButton>
                            </ListItem>
                            <Divider />
                        </span>
                         
                  )
                })}

              

               
           
          </List>
         
        </Box>
      );
    
      return (
        <div>
         
          <Drawer open={ props.open} onClose={(e)=> props.toggleNavBar(false)}>
             <span style={{alignSelf:'center',marginTop:'20vh'}}>  <Avatar style={{width:'80px',height:'80px'}} /></span>
               
                  {DrawerList}
               
          </Drawer>
        </div>
      );
}

export default Sidenav