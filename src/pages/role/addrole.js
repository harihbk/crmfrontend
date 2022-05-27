import React , { useState ,useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useForm } from "react-hook-form";
import {  TextField, Grid } from "@material-ui/core";
import axios from 'axios';
import { display } from '@mui/system';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function AddRole({...props}) {
  const {closemodel ,snackbar , onfromchildsubmit ,editdata } = props
 

    const [open, setOpen] = React.useState(true);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const [ errorMessage , setErrorMessage ] = useState('');
    const { register , handleSubmit , formState : {errors} , reset} = useForm();
   
  
    const onsubmit = (data) => {
          onfromchildsubmit(data)
          closemodel(false);
    }

    useEffect(()=>{
       if(editdata){
        reset(
          { name: editdata.name ,
            slug: editdata.slug,
            description: editdata.description
          }
      );
       }
    },[editdata])


  return (
    <Dialog
      className="custModal"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
   
      <div className="cardinner">
          <DialogTitle className="modalTitle" >Add Role</DialogTitle>
          <DialogContent>
              <form>
                    <Grid container direction="column" spacing={0}>
                            <Grid item>
                                    <TextField
                                    {...register('name', { required: true })}
                                    type="text"
                                    placeholder="Name"
                                    fullWidth
                                    name="name"
                                    margin="normal"
                                    variant="outlined"
                                    id="outlined-name"
                                    label="Name"
                                    autoFocus
                                />
                              

                                  
                            </Grid>
                            {errors.name && <span className="error">Name is required.</span>}
                            <Grid item>
                                <TextField
                                {...register('slug', { required: true })}
                                type="text"
                                placeholder="slug"
                                fullWidth
                                name="slug"
                                margin="normal"
                                variant="outlined"
                                id="outlined-name"
                                label="Slug"
                                />
                            </Grid>
                            {errors.slug && <span className="error">slug is required.</span>}
                            <Grid item>
                            <Grid item>
                                <TextField
                                {...register('description', { required: false })}
                                type="text"
                                placeholder="Description"
                                fullWidth
                                name="description"
                                margin="normal"
                                variant="outlined"
                                id="outlined-name"
                                label="Description"
                                />
                            </Grid>
                            </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </div>
        <DialogActions className="modalAction">
          <Button variant="outlined" className="cancelBtn" onClick={()=>{closemodel(false); snackbar((state)=>{
            return {
              status : false
            }
          })}}>Cancel</Button>
          <Button className="submitBtn" onClick={handleSubmit(onsubmit)}>Submit</Button>
        </DialogActions>
   </Dialog>
  )
}
