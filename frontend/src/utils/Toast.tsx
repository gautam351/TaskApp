import { toast,TypeOptions } from "react-toastify";

//react toastify 
 export const InvokeToast = (msg: string,toasttype:TypeOptions="info") => {
        
    toast(msg, {
        position: "bottom-center",
        type:toasttype 
    });
 
}
