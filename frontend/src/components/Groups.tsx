import React, { useEffect } from 'react'
import Header from './Header'
import GroupList from './GroupList'
import "./../css/GroupList.css"
import { HubConnectionBuilder } from "@microsoft/signalr"
import Connector from "../Wsconnection"
import { Box, Button, TextField, Typography } from '@mui/material'
import ChatBody from './ChatBody'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Groups = () => {
  let user = JSON.parse(sessionStorage.getItem("user") || "{}");
  let { groupid } = useParams();  
  let dispatch = useDispatch();
  let connection = Connector(dispatch);

  // useEffect(() => {
    
  //   connection.connection.on("messageReceived", (obj) => {
  //     console.log("obj ",obj);
  // })

  // });

 
  
console.log("chat grp ",groupid);

  return (
    <>
      {/* header section */}

      {/* <button onClick={() => connection.newMessage("group1", "hello")}>send</button>  */}
      <div className="groups">
        {/* side list  section */}
        <div className="grpList">
          <Header headerType="chatScreen" />

          <GroupList />
        </div>

        {/* opened group window */}
        <div className="grpwindow">


         {groupid=="0"?null: <ChatBody groupid={groupid || ""} />}
        </div>
      </div>


    </>
  )
}

export default Groups