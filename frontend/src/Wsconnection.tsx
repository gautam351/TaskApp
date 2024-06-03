import * as signalR from "@microsoft/signalr";
import { UseDispatch, UseSelector, useDispatch } from "react-redux";
import { setCurrGroups } from "./redux/GroupChatReducer";
const URL = process.env.HUB_ADDRESS ?? "https://localhost:7292/chatR"; //or whatever your backend port is
let user=JSON.parse(sessionStorage.getItem("user")||"{}");  
class Connector {
    public connection: signalR.HubConnection;
    
    // public events: (onMessageReceived: (username: string, message: string) => void) => void;
    static instance: Connector;
    constructor(dispatch:any) {
        
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        
         
        
       
          
        
        
        this.connection.start()
            .then(async() => {
                console.log("connected success");
                await this.connection.invoke("TestFunc","1");
                await this.connection.invoke("OnConnectedAddToGroups",user?.id?.toString() || "2")

            }
        ).catch(err => document.write(err));
        
        this.connection.on("messageReceived", (obj) => {
            console.log("obj", obj);
            dispatch(setCurrGroups(obj))
                
            })
        // this.events = (onMessageReceived) => {
        //     this.connection.on("messageReceived", (username, message) => {
        //         onMessageReceived(username, message);
        //     });
        // };
    }
    public newMessage = async(message: string,grpName:string) => {
       
    //    await  this.connection.invoke("TestFunc","1");
  
    
        this.connection.invoke("SendMessageInGroup", grpName?.toString(), message, user?.id?.toString()).then(x => console.log("sent"))
        .catch(err => console.error(err));
    }


    public static getInstance(dispatch:any): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector(dispatch);
        return Connector.instance;
    }
}
export default Connector.getInstance;