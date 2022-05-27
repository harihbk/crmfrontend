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

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


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
  
export default function Addmeeting({...props}) {
  const { _addmeetingpopup , _setAddmeetingpopup , _parentid , _setSnackbar } = props
  const [nextfollowupdate, setNextfollowupdate] = React.useState(new Date());
  const [valuedate, setValuedate] = React.useState(new Date());

  const { register, setValue ,control, handleSubmit, reset, formState, watch } = useForm();

  const classes = useStyles();


 
  const handleClose = () => {
    _setAddmeetingpopup(false)
  };

 
  const onSubmit = (values) => {
    values.date = nextfollowupdate
    const _id = _parentid;
    var obj = {};
    obj['meeting'] = values
   // console.log(obj);
    axios.patch(`${process.env.REACT_APP_BASE_URL}/leadsubdocs/${_id}`,obj).then(res=>{
    console.log(res);
    reset({schedule:'',meeting_notes:''})
    _setAddmeetingpopup(false)

      _setSnackbar((state)=>{
        return {
          status : true,
          text   : "Meeting added Successfully",
          severity : "success"
        }
      })
    
     // from parent dialogue close
    }).catch(err=>{
        _setAddmeetingpopup(false)

      _setSnackbar((state)=>{

        return {
          status : true,
          text   : "Meeting not added",
          severity : "warning"
        }
      })
        console.log(err);
    })

 }
 

  return (
    <React.Fragment>
      
      <Dialog
        open={_addmeetingpopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle>{"ADD Meeting"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

            <form  onSubmit={handleSubmit(onSubmit)}>


            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    {...register(`date`)}

                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={valuedate}
                    onChange={(newValue) => {
                    setValuedate(newValue);
                    }}
                />
                </LocalizationProvider>

   
            <TextField 
                        className = { classes.fieldpadding }
                        {...register(`agenda_meeting`)}
                        id="outlined-basic" 
                        label="Agenda of the meet" 
                        variant="outlined" />

            <TextField 
                        className = { classes.fieldpadding }
                        {...register(`contact_person`)}
                        id="outlined-basic" 
                        label="Contact person" 
                        variant="outlined" />

            <TextField 
                        className = { classes.fieldpadding }
                        {...register(`meeting_link`)}
                        id="outlined-basic" 
                        label="Meeting Link" 
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
