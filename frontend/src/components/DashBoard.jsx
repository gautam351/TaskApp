import React, { useEffect } from 'react'
import Sidenav from './Sidenav'
import Header from './Header'
import KanbbanBoard from './KanbbanBoard'
import { BoardControllerServices } from '../Services/BoardServices'
import { useDispatch } from 'react-redux'
import { setBoardData } from '../redux/GroupChatReducer'


//boards
const DashBoard = () => {
  
  const BoardServices = new BoardControllerServices();
  let dispatch = useDispatch();
  useEffect(() => {
   
    const GetData = async () => {
      // api call for getting all the added to board messages 
    const {data} = await BoardServices.getAllBoards();
      dispatch(setBoardData(data?.result || []));
    }
    GetData();
  
   
  }, [])
  

  return (
    <>
      {/* header */}
      <Header />

      {/* kanban board  */}
      <KanbbanBoard />
      
     
    </>
  )
}

export default DashBoard