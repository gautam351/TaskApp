import React from 'react'
import { Outlet, Navigate } from "react-router-dom"

//component for protected route
const PrivateRoute = () => {
    
    //auth logic 
    let auth = true;

  return (
       auth?<Outlet/>:<Navigate to={"/login"} />
  )
}

export default PrivateRoute