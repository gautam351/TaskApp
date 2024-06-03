import { Card, CardContent, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import "./chatbody.css"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import Mic from '@mui/icons-material/Mic';
import Header from './Header';
import HeaderChatBody from './HeaderChatBody';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Connector from "../Wsconnection"
import { MessagesServices } from '../Services/MessagesServices';
import { setCurrGroups, setCurrGroupsApiData } from '../redux/GroupChatReducer';
import TaskCardCreation from './TaskCardCreation';
const ChatBody = ({ groupid }) => {
  const { currGrp } = useSelector((state) => state.group);
  
  let { groups } = useSelector((state) => state.group);
  const [chats, setchats] = useState([]);
  const [taskCreationOpen, settaskCreationOpen] = useState(false);
  let user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const [msg, setmsg] = useState("");
  let dispatch = useDispatch();

  let connection = Connector(dispatch);

  useEffect(() => {
    setchats([]);
    setmsg("");
  }, [groupid])
  const GetGrpId = () => {
    console.log(useParams());
    return useParams()?.groupid;
  }

  useEffect(() => {

    const getCurrGroupChat = async () => {
      if (currGrp) {
        const { data } = await new MessagesServices().getAllMessages(currGrp?.groupId);
      
        dispatch(setCurrGroupsApiData(data?.messages));
      }
    }

    getCurrGroupChat(); 
  

  },[currGrp]);


  function isJsonString(str) {
    try {
      let obj = JSON.parse(str);
      return obj;
    } catch (e) {
       
    }
    return str;
  
  }

  const HandleSend = async () => {
    if (msg == "") {
      return;
    }
    //    connection./.invoke("SendMessageInGroup", { message: msg, groupId: groupid }); 
    try {
      await connection.newMessage(msg, currGrp?.groupId);
      setmsg("");

    } catch (error) {
      console.log("something went wrong");
    }
  }
  
  const HandleCreateTaskOpen = () => {
    console.log("attach clicked");  
    settaskCreationOpen(true);
  }

  

  return (
    <>
      <div className="ChatBody">
        <HeaderChatBody />
        <div className="messages">
          {groups?.map((e, indx) => {
             let msg=isJsonString(e?.msg);
              return (
                <div id={indx} className={`msg ${(e?.senderId == user?.id?.toString() || e?.sendersId == user?.id?.toString()) ? "msgright" : "msgleft"}`}>
                  {console.log(msg)}
                  {
                    msg?.type == "Task" ?
                    
                    <Card style={{ marginBottom: '20px', backgroundColor: '#f4f5f7', borderRadius: '5px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
                    <CardContent style={{ padding: '16px' }}>
                      <Typography variant="h5" component="h2" style={{ marginBottom: '8px', fontWeight: '500' }}>
                        {msg?.title}
                      </Typography>
                      <Typography color="textSecondary" style={{ marginBottom: '16px', fontSize: '14px', color: '#5e6c84' }}>
                        Difficulty: {msg?.difficulty}
                      </Typography>
                      <Typography variant="body2" component="p" style={{ marginBottom: '16px', fontSize: '14px', color: '#172b4d' }}>
                        {msg?.description}
                      </Typography>
                      <Typography color="textSecondary" style={{ fontSize: '14px', color: '#5e6c84' }}>
                        URL: <a href={msg?.url} style={{ color: '#0052cc' }}>{msg?.url}</a>
                      </Typography>
                    </CardContent>
                  </Card>
                    
                    : <p className="msgchip">{e.msg}</p>
                 }
                </div>
              );
           
          })}
        </div>

        {/* footer */}

        <div className="footer">
          <div className="footerLeft">
            <EmojiEmotionsIcon className="icon " />
          
            <AttachFileIcon className="icon visible" />
           
            <span onClick={(e)=>HandleCreateTaskOpen()} style={{cursor:"pointer"}}>
              <AddCircleIcon className="icon visible" />
              </span>
          </div>

          <form
            //   onSubmit={(e) => sendmessage(e)}
            className="textField">
            <TextField
              fullWidth
              label="Message"
              id="fullWidth"
              onChange={(e) => setmsg(e.target.value)}
              value={msg}
            />
          </form>
          <span style={{ cursor: msg.length > 0 ? "pointer" : "not-allowed" }}>
            <SendIcon className="icon send" onClick={(e) => HandleSend()} />
          </span>
          <div className="speaktotext">

            <Mic className="icon mic" />
          </div>
        </div>
      </div>

      <TaskCardCreation  open={taskCreationOpen}  setOpen={settaskCreationOpen} id={currGrp?.groupId}  />

    </>
  )
}

export default ChatBody