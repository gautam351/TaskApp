import { Config } from "../Config"
import axios from "axios"
import { GetHeaderOptions } from "../utils/AuthBearerToken";
export class BoardControllerServices {

    endPoint: string;
    user: any;
    headerConfig: any;
    constructor() {
        this.endPoint = Config.API_URL + "/KanbanBoard";
        this.user =   JSON.parse(sessionStorage.getItem("user") || "{}");
        this.headerConfig = GetHeaderOptions();
    }



    getAllBoards = async () => {
        try {
            
            const url = this.endPoint + "/GetBoardData?userId=" + this.user?.id;
            const { data } = await axios.get(url, this.headerConfig);
            return data;

        } catch (error: any) {
           
            return error?.response?.status;

        }
    }
    
    UpdateTaskStatus = async (taskId:any,statusId:any) => {
        try {
           
            const url = this.endPoint + `/UpdateBoardStatus?taskId=${taskId}&status=${statusId}`;
        
            const { data } = await axios.put(  url, {}, this.headerConfig);
            return data;

        } catch (error: any) {
           
            return error?.response?.status;

        }
    }

    DeleteTaskFromBoard = async (taskId: any) => { 
        try {
            const url = this.endPoint + `/DeleteTaskFromBoard?taskId=${taskId}`;
            const { data } = await axios.delete(url, this.headerConfig);
            return data;
        } catch (error: any) {
            return error?.response?.status;
        }
    }
}