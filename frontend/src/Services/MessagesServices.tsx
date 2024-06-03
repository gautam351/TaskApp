import { Config } from "../Config"
import axios from "axios"
import { GetHeaderOptions } from "../utils/AuthBearerToken";
export class MessagesServices {

    endPoint: string;
    user: any;
    headerConfig: any;
    constructor() {
        this.endPoint = Config.API_URL + "/Messages";
        this.user =   JSON.parse(sessionStorage.getItem("user") || "{}");
        this.headerConfig = GetHeaderOptions();
    }


    getAllMessages = async (grpId:number) => {
        try {
            const url = this.endPoint + "/GetAllMessages?groupId=" + grpId;
            const { data } = await axios.get(url, this.headerConfig);
            return data;

        } catch (error: any) {
           
            return error?.response?.status;

        }
    }       
}