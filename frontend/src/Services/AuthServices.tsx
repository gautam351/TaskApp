import axios, { AxiosError } from "axios"
import { Config } from "../Config";
import { GetHeaderOptions } from "../utils/AuthBearerToken";

export class AuthServices {
    endPoint: string;
    headerConfig: any;
    constructor() {
        this.endPoint = this.endPoint = Config.API_URL + "/AuthControllers";
        this.headerConfig = GetHeaderOptions();
    }

    Login = async (userName: string, password: string) => {
        const url = this.endPoint + "/LoginUser";
        console.log(url);
        
        const body = { userName, password };
        try {
            const { data } = await axios.post(url, body);
            console.log(data);
            
            return data;
        } catch (error: any) {
            console.log(error);
            
            return    error?.response?.status;
        }

    }
}