import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';  
import { makeStyles } from '@material-ui/core/styles';
import { useForm , useFieldArray } from 'react-hook-form';

import Slide from '@mui/material/Slide';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TextField from "@material-ui/core/TextField";


import DialogContentText from '@mui/material/DialogContentText';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    dialog: {
      height: 500,
      width : 500
    },
    fieldpadding:{
      paddingBottom : 10
  }
  });
  
export default function Addlog({...props}) {
  const { _addlogpopup , _setAddlogpopup , _parentid , _setSnackbar } = props
  const [schedule, setSchedule] = React.useState('Inperson meeting');
  const [nextfollowupdate, setNextfollowupdate] = React.useState(new Date());

  const { register, setValue ,control, handleSubmit, reset, formState, watch } = useForm();

  const classes = useStyles();


 
  const handleClose = () => {
    _setAddlogpopup(false)
  };

 
  const onSubmit = (values) => {
    values.date = nextfollowupdate
    const _id = _parentid;
    var obj = {};
    obj['log'] = values
    console.log(obj);
    axios.patch(`${process.env.REACT_APP_BASE_URL}/leadsubdocs/${_id}`,obj).then(res=>{
    reset({schedule:'',meeting_notes:''})
    _setAddlogpopup(false)

      _setSnackbar((state)=>{
        return {
          status : true,
          text   : "Log added Successfully",
          severity : "success"
        }
      })
    
     // from parent dialogue close
    }).catch(err=>{
      _setAddlogpopup(false)

      _setSnackbar((state)=>{

        return {
          status : true,
          text   : "Log not added",
          severity : "warning"
        }
      })
        console.log(err);
    })

 }
 

  return (
    <React.Fragment>
      
      <Dialog
        open={_addlogpopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle>{"ADD Log"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

            <form  onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth  >
                    <InputLabel id="demo-simple-select-label">schedule</InputLabel>
                    <Select
                    {...register("schedule")}
                    
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={schedule}
                    label="Schedule"
                    onChange={(e)=>setSchedule(e.target.value)}
                    >
                    <MenuItem value="Inperson meeting">Inperson meeting</MenuItem>
                    <MenuItem value="Online meeting">Online meeting</MenuItem>
                    <MenuItem value="Call">Call</MenuItem>
                    
                    </Select>
                </FormControl>


                <DatePicker style={{ border: '1px solid #eadede' }} className="MuiInputBase-input MuiOutlinedInput-input" {...register("date")} selected={nextfollowupdate} onChange={(date) => setNextfollowupdate(date)} />

                <TextField 
                        className = { classes.fieldpadding }
                        {...register(`meeting_notes`)}
                        id="outlined-basic" 
                        label="Meeting notes" 
                        variant="outlined" />

                <Button variant="outlined" type="submit">Save</Button>
            </form>
            

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>


    </React.Fragment>
  );
}
