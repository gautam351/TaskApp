import { useNavigate } from "react-router-dom";
import { InvokeToast } from "./Toast";


export const UnauthorizedHelper = () => {
    const naviagte = useNavigate();
    InvokeToast("Unauthorized", "error");
      setTimeout(() => {
          naviagte("/login");
      }, 2000);
}