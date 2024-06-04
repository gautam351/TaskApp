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
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Tooltip from '@mui/material/Tooltip';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { InvokeToast } from '../utils/Toast';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';





// speech web api 
let mic;
let SpeechRecognition;




const ChatBody = ({ groupid }) => {

  useEffect(() => {
    SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    mic = new SpeechRecognition();

    mic.continuous = true;
    // mic.interimResults=true;
    mic.lang = "en-IN";

  }, []);




  const { currGrp } = useSelector((state) => state.group);

  let { groups } = useSelector((state) => state.group);


  const [chats, setchats] = useState([]);

  useEffect(() => {
    setchats([...groups]);

  }, [groups])


  const [taskCreationOpen, settaskCreationOpen] = useState(false);
  let user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const [msg, setmsg] = useState("");

  // speec to text

  const [status, setstatus] = useState(0);



  // speech recorgnition

  const voice = () => {
    if (status) {

      mic.stop();
      setstatus(0);

    }
    else {

      setstatus(1);

      mic.start();

      mic.onspeechend = () => {
        console.log("mic off");
        mic.stop();
        setstatus(0);

      };
      mic.onresult = (e) => {
        console.log(e);
        const transcript = e.results[0][0].transcript;
        console.log(transcript);


        setmsg(" " + msg + " " + transcript + " ");

        mic.stop();
        setstatus(0);

      };


    }


  };


  let dispatch = useDispatch();

  let connection = Connector(dispatch);

  useEffect(() => {
    setmsg("");
  }, [groupid]);
  const GetGrpId = () => {
    console.log(useParams());
    return useParams()?.groupid;
  }

  const MessageSerivesObj = new MessagesServices();

  useEffect(() => {

    const getCurrGroupChat = async () => {
      if (currGrp) {
        const { data } = await MessageSerivesObj.getAllMessages(currGrp?.groupId);

        dispatch(setCurrGroupsApiData(data?.messages));
      }
    }

    getCurrGroupChat();


  }, [currGrp]);


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
    settaskCreationOpen(true);
  }



  const UpdateMessage = async (Type, msg, id, indx) => {

    let newMessage = msg;
    switch (Type) {
      case "Add": newMessage["ToggleAdd"] = true; break;
      case "Remove": newMessage["ToggleAdd"] = false; break;
      case "Like": newMessage["ToggleLike"] = true; break;
      case "Dislike": newMessage["ToggleLike"] = false; break;

    }
    const { data } = await MessageSerivesObj.UpdateMessage(id, JSON.stringify(newMessage))


    if (data?.result) {
      let temp = [...chats];
      temp[indx] = { ...temp[indx], msg: JSON.stringify(newMessage) };
      setchats(temp);
      if (Type == "Add") InvokeToast("Added to Board", "success");
      else if (Type == "Remove") InvokeToast("Removed from Board", "success");
    }
    else {
      InvokeToast("Something went wrong", "error");
    }
    return false;

  }
  return (
    <>
      <div className="ChatBody">
        <HeaderChatBody />
        <div className="messages">
          {chats?.map((e, indx) => {
            let msg = isJsonString(e?.msg);
            let addToggle = false;
            let likeDislike = false;
            if (typeof (msg) == 'object') {
              addToggle = msg?.ToggleAdd || false;
              likeDislike = msg?.ToggleLike || false;
            }
            return (
              <div id={indx} className={`msg ${(e?.senderId == user?.id?.toString() || e?.sendersId == user?.id?.toString()) ? "msgright" : "msgleft"}`}>
                {/* {console.log(msg)} */}
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

                        <div className="btns-container">
                          <Tooltip title="Add To Board" className="btn " style={{ cursor: "pointer" }} onClick={async (evt) => {

                            let temp = await UpdateMessage(addToggle ? "Remove" : "Add", msg, e?.id, indx)


                          }}>

                            {
                              addToggle ?
                                <CheckCircleIcon className='icon' /> :
                                <AddCircleIcon className="icon" />


                            }


                          </Tooltip>
                          <Tooltip title="Like" className="btn" style={{ cursor: "pointer" }}
                            onClick={(evt) => { UpdateMessage("Like", msg, e?.id, indx) }}
                          >
                            {likeDislike ? <ThumbUpAltIcon className="icon" /> : <ThumbUpOffAltIcon className="icon" />}
                          </Tooltip>
                          <Tooltip title="Dislike" className="btn" style={{ cursor: "pointer" }}
                            onClick={(evt) => { UpdateMessage("Dislike", msg, e?.id, indx) }}

                          >
                            {likeDislike ? <ThumbDownOffAltIcon className="icon" /> : <ThumbDownAltIcon className="icon" />}
                          </Tooltip>
                        </div>
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

            <Tooltip title="Create Task" onClick={(e) => HandleCreateTaskOpen()} style={{ cursor: "pointer" }}>
              <AddCircleIcon className="icon visible" />
            </Tooltip>
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
          <Tooltip title="Send" style={{ cursor: msg.length > 0 ? "pointer" : "not-allowed" }}>
            <SendIcon className="icon send" onClick={(e) => HandleSend()} />
          </Tooltip>
          <div className="speaktotext">
            <Tooltip title="Speech to text">
              <Mic className="icon mic" style={{ backgroundColor: status ? "greenyellow" : "inherit", cursor: "pointer" }} onClick={(e) => { console.log("cliked"); voice() }} />

            </Tooltip>
          </div>
        </div>
      </div>

      <TaskCardCreation open={taskCreationOpen} setOpen={settaskCreationOpen} id={currGrp?.groupId} />

    </>
  )
}

export default ChatBody