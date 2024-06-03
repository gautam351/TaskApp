import React, { useEffect, useState } from 'react'
import { GroupControllerServices } from '../Services/GroupServices';
import { ToastContainer, TypeOptions, toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';
import { InvokeToast } from '../utils/Toast';
import { Avatar, Divider, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { UnauthorizedHelper } from '../utils/HelperFunctions';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { resetGroupState, setCurrGroups, setcurrGroupId } from '../redux/GroupChatReducer';
const GroupList = () => {

    const groupControllServices = new GroupControllerServices();
    let naviagte = useNavigate();
    const [groupList, setgrpList] = useState([]);
    const [groupListToAdd, setgrpListToAdd] = useState([]);

    const [searchText, setsearchText] = useState("");
    let dispatch = useDispatch();
  
    const GetData = async () => {
        const data = await groupControllServices.getAllGroups();
        if (data == 401) {
            UnauthorizedHelper();
        }
        else if (!data?.data) {
            InvokeToast("Something Went Wrong", "error");
          }
        else {
            setsearchText("");
            setgrpList(data?.data?.allGroups);
            // saving the data into the redux store
            setgrpListToAdd([]);
            
        }
    }

    // useeffect to get the list of all groups
    useEffect(() => {

        
        GetData();
    }, []);






    const HandleSearch=async()=> {
        setgrpListToAdd([]);
        if (searchText == "") { InvokeToast("Search Field is Empty", "warning"); return; }

        const data = await groupControllServices.getGroupsByName(searchText);
        if (data == 401) {
            UnauthorizedHelper();
        }
        else if (!data?.data) {
            InvokeToast("Something Went Wrong", "error");
          }
        else {
            setgrpList(data?.data?.result[0]);

            setgrpListToAdd(data?.data?.result[1]);
        }

    }

    const HandleClear = () => {
        if (searchText == "") return;
        GetData();
    }

    const HandleJoinGrp = async(grpID: number) => {
        const data = await groupControllServices.joinGrpByID(grpID);
        if (data == 401) {
            UnauthorizedHelper();
        }
        else if (!data?.data) {
            InvokeToast("Something Went Wrong", "error");
          }
        else if (data?.data?.status) {
            InvokeToast("Joined Successfully", "success");
            GetData();
        }
        else {
            InvokeToast("Unable to join ", "error");
        }
    }

    const HandleLeaveGrp = async(grpID:number) => {
        const data = await groupControllServices.leaveGrpByID(grpID);
        if (data == 401) {
            UnauthorizedHelper();
        }
        else if (!data?.data) {
            InvokeToast("Something Went Wrong", "error");
          }
        else if (data?.data?.status) {
            InvokeToast("Left Successfully", "success");
            GetData();
        }
        else {
            InvokeToast("Unable to join ", "error");
        }
    }

    const HandleGroupSelect = (grp:any) => {
        dispatch(setcurrGroupId(grp));
        dispatch(resetGroupState());

     console.log(grp);
     
        naviagte(`/groups/${grp?.groupId}`);
        
    }
    

    const renderList = (list:never[],type:number) => {
        return list.map((e: any, indx) => {
            return (

                <span key={indx} >
                    <ListItem alignItems="flex-start" sx={{ maxHeight: "12vh",cursor:"pointer" }} onClick={(evt)=>HandleGroupSelect(e)}>
                        <ListItemAvatar>
                            <Avatar alt={e?.groupName} src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ textTransform: "capitalize" }}
                            primary={e?.groupName}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {e?.description}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                        <ListItemAvatar   >
                            {type == 0 ?
                                <span onClick={(evt)=>HandleLeaveGrp(e?.groupId)}>
                            <DeleteIcon fontSize="small" sx={{ color: "red", marginTop: "15%", cursor: "pointer" }} />
                                    
                              </span>
                              :
                            <span onClick={(evt)=>HandleJoinGrp(e?.groupId)}><AddCircleIcon fontSize="small" sx={{ color: "green", marginTop: "15%", cursor: "pointer" }}  /></span>   
                            }
                         </ListItemAvatar>
                    </ListItem>
                    {indx!=groupList.length-1? <Divider variant="inset" component="li" />:null}
                </span>


            )
        })

    }

    return (
        <>
            <div className="grplistCOntainer" >

                

                {/* -----------------------------search bar --------------------------------------------------- */}


                <span  >
                    <ListItem alignItems="flex-start" sx={{ maxHeight: "12vh" }}>

                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        >

                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Group"
                                inputProps={{ 'aria-label': 'search Group' }}
                                value={searchText}
                                onChange={(e)=>setsearchText(e.target.value)}
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={(e)=>HandleSearch()}>
                                <SearchIcon />
                                
                            </IconButton>

                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={(e)=>HandleClear()}>
                                <HighlightOffIcon />
                                
                            </IconButton>


                        </Paper>

                    </ListItem>
                </span>


                {/* ------------------------------item list--------------------------------------- */}
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                    {renderList(groupList,0)}
                    {renderList(groupListToAdd,1)}

                    
                </List>


            </div>
            <ToastContainer />
        </>
    )
}

export default GroupList