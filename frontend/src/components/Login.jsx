import React, { useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from 'react-router-dom';
import { AuthServices } from '../Services/AuthServices';
import { InvokeToast } from '../utils/Toast';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const AuthService = new AuthServices();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
    
  //login handler
  const handleSubmit = async () => {
      if (username == "" || password == "") { InvokeToast("Incomplete Details", "error"); return; }
    const data = await AuthService.Login(username, password);
    // console.log(data.data);
    if (data?.data?.error) {
      
      InvokeToast(data.message, "error");
    }
    else if (!data?.data) {
      InvokeToast("Something Went Wrong", "error");
    }
    else {
      sessionStorage.setItem("token", data?.data?.token);
      sessionStorage.setItem("user",JSON.stringify( data?.data?.user));

      navigate("/dashboard");
    }
   
    }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box  sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={(e)=>setusername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e)=>handleSubmit()}
          >
            Sign In
          </Button>
          <Grid container>
           
            <Grid item>
              <span onClick={(e)=>navigate('/register')} style={{color:'blue',cursor:'pointer'}} variant="body2">
                {"Don't have an account? Sign Up"}
              </span>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  )
}

export default Login