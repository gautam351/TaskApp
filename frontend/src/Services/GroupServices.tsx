import { Config } from "../Config"
import axios from "axios"
import { GetHeaderOptions } from "../utils/AuthBearerToken";
export class GroupControllerServices {

    endPoint: string;
    userID: number;
    headerConfig: any;
    constructor() {
        this.endPoint = Config.API_URL + "/Group";
        this.userID = parseInt(sessionStorage.getItem("userID") || "1");
        this.headerConfig = GetHeaderOptions();
    }


    getAllGroups = async () => {
        try {
            const url = this.endPoint + "/GetAllGroups?userId=" + this.userID;
            const { data } = await axios.get(url, this.headerConfig);
            return data;

        } catch (error: any) {
           
            return error?.response?.status;

        }
    }


    getGroupsByName = async (pattern:string) => {
        try {
            const url = this.endPoint + "/SearchGroupByName?groupName=" + pattern+"&userID="+this.userID;
            const { data } = await axios.get(url, this.headerConfig);
            return data;

        } catch (error: any) {
           
            return error?.response?.status;

        }
    }

    joinGrpByID = async (grpId: number) => {
        try {
            const url = this.endPoint + "/JoinGroup?grpID=" + grpId + "&userID=" + this.userID;
            const { data } = await axios.get(url, this.headerConfig);
            return data;

        } catch (error: any) {
           
            return error?.response?.status;

        }
    }

    leaveGrpByID = async (grpId: number) => {
        try {

            const url = this.endPoint + "/LeaveGrp?grpID=" + grpId + "&userID=" + this.userID;
            const { data } = await axios.get(url, this.headerConfig);
            return data;

        } catch (error: any) {
           
            return error?.response?.status;

        }
    }
}