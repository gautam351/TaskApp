import { React, useEffect, useState } from 'react'
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import CardComponent from './CardComponent';
import { useSelector } from 'react-redux';
import { BoardControllerServices } from '../Services/BoardServices';
import { InvokeToast } from '../utils/Toast';
import { ToastContainer } from 'react-toastify';


const board = {
    columns: [
        {
            id: 0,
            title: "Backlog",
            cards: [
               
            ]
        },
        {
            id: 1,
            title: "Taken",
            cards: [
               
            ]
        },
        {
            id: 2,
            title: "Working",
            cards: [
               
            ]
        },
        {
            id: 3,
            title: "Completed",
            cards: [
               
            ]
        }
    ]
};


function ControlledBoard() {
    // You need to control the state yourself.
    const [controlledBoard, setBoard] = useState(board);
   let BoardServicesObj = new BoardControllerServices();
    let { boardData } = useSelector((state) => state.group);
    useEffect(() => {
        
        const ManipulateBoardData = () => {
            let Backlog = [], Taken = [], Working = [], Completed = [];    
            boardData.forEach(element => {
                if(element.status == 0){
                    Backlog.push(element);
                }
                if(element.status == 1){
                    Taken.push(element);
                }
                if(element.status === 2){
                    Working.push(element);
                }
                if(element.status === 3){
                    Completed.push(element);
                }
            }); 

            setBoard((prevData) => {
                let updatedState = { ...prevData };
                updatedState.columns[0].cards = Backlog;    
                updatedState.columns[1].cards = Taken;  
                updatedState.columns[2].cards = Working;    
                updatedState.columns[3].cards = Completed;  
                console.log(updatedState);
                return updatedState;
            })
        }
        ManipulateBoardData();
     
    }, [boardData])
    

    async function handleCardMove(_card, source, destination) {
        console.log("card", _card);
        console.log("source", source);
        console.log("destination", destination);
        if (source.fromColumnId != destination.toColumnId) {
            const { data } = await BoardServicesObj.UpdateTaskStatus(_card.taskId, destination.toColumnId); 
            
            if (data?.result == 1) {
                const updatedBoard = moveCard(controlledBoard, source, destination);
                setBoard(updatedBoard);
            //    InvokeToast("Task status updated", "success");   
            }
            else {
                InvokeToast("Task status not updated", "error");
            }
               
           }
        }
       
    
    
    const HandleDelete = async(id) => {
        const { data } = await BoardServicesObj.DeleteTaskFromBoard(id);
        if (data?.result == 1) {
            InvokeToast("Task Removed Successfully", "success"); 
            //Remove the object from controlledBoard which have the same taskId as id
            let temp = { ...controlledBoard };
            temp.columns.forEach((element) => {
                element.cards = element.cards.filter((item) => item.taskId != id);
            });
            setBoard(temp);
        }
        else {
            InvokeToast("Something Went Wrong", "error");
        }


    }

    return (
       
        <Board
            
            renderCard={(content, { dragging }) => (
           
                <div dragging={dragging}>
                  
                <CardComponent content={content}  HandleDelete={HandleDelete} />
            </div>
            )}

            disableColumnDrag
            onCardDragEnd={handleCardMove} >
            {controlledBoard}
        </Board>
    );
}



const KanbbanBoard = () => {
    return (
        <>


            <ControlledBoard />
            <ToastContainer />
        </>
    )
}

export default KanbbanBoard