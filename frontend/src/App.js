import './App.css';
import {BrowserRouter as Router, Routes,Route, Navigate} from "react-router-dom"
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import DashBoard from './components/DashBoard';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route  path="" element={<Navigate  to={"/login"}/>} />
          <Route path={'/login' } element={<Login />} />
          <Route path={'/Register' } element={<Register/>}   / >
          <Route  element={<PrivateRoute/>}  >
           
            <Route path='/dashboard' element={ <DashBoard/>} />


          </Route>

        </Routes>

     </Router>
    
    
    </>
  );
}

export default App;
