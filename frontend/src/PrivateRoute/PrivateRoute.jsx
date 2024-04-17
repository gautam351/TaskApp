import React from 'react'
import { Outlet, Navigate } from "react-router-dom"

//component for protected route
const PrivateRoute = () => {
    
    //auth logic 
    let auth = sessionStorage.getItem("token");

  return (
       auth?<Outlet/>:<Navigate to={"/login"} />
  )
}

export default PrivateRoute

