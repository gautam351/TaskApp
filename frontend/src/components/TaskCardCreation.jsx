import * as React from 'react';
import { useState } from 'react';   
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, NativeSelect, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import Connector from "../Wsconnection"

export default function TaskCardCreation({open,setOpen,id}) {
 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    let dispatch = useDispatch();

    let connection = Connector(dispatch);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

    const handleClose =async () => {
      
        const msgOBj = {
            type:"Task",
            title,
            description,
            url,
            difficulty  
        }

        const msg = JSON.stringify(msgOBj);

        try {
            await connection.newMessage(msg, id );
         
      
          } catch (error) {
            console.log("something went wrong");
          }

        setTitle('');
        setDescription(''); 
        setUrl(''); 
        setDifficulty('easy');  
        
    setOpen(false);
  };

  return (
    <React.Fragment>

      <Dialog
        open={open}
        onClose={(e)=>handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
         
                  {/* title */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="Title"
            name="Title"
            label="Title"
                      type="text" 
                      value={title}
                      onChange={(e)=>setTitle(e.target.value)}
            fullWidth
                      variant="standard"
                      style={{marginTop:"20px"}}
                  />
                  
                  {/* Description */}
                  <TextField
            autoFocus
            required
            margin="dense"
            id="Description"
            name="Description"
            label="Description"
            type="text" 
            fullWidth
                      variant="standard"
                      value={description}   
                      onChange={(e)=>setDescription(e.target.value)}    
            style={{marginTop:"20px"}}
                  />

                  {/* Link */}

                  <TextField
            autoFocus
            
            margin="dense"
            id="Link"
            name="Link"
            label="Link"
            type="url" 
            fullWidth
                      variant="standard"
                      value={url}     
                      onChange={(e)=>setUrl(e.target.value)}      
            style={{marginTop:"20px"}}
                  />  

                  {/*  Difficulty Level */}
               
                
                <FormControl required style={{marginTop:"20px"}} variant="standard">
                    <InputLabel htmlFor="difficulty">Difficulty</InputLabel>
                    <NativeSelect
                        autoFocus
                        required
                        margin="dense"
                        id="difficulty"
                        name="difficulty"
                        fullWidth
                          variant="standard"
                          value={difficulty}
                          onChange={(e)=>setDifficulty(e.target.value)} 
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </NativeSelect>
                </FormControl>




        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
