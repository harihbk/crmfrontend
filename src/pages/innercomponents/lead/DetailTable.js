import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FiPlus ,FiList } from "react-icons/fi";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { useForm , useFieldArray } from 'react-hook-form';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TextField from "@material-ui/core/TextField";
import axios from 'axios';  
import Showlog from './Showlog';
import Addlog from './Addlog';


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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function DetailTable({...props}) {
  const [open, setOpen] = React.useState(false);
  const [log , setLog]  = React.useState(false);

  const [currentid, setCurrentid] = React.useState("");
  const [parentid, setParentid] = React.useState("");

  const [ id , setId] = React.useState({})

  const [schedule, setSchedule] = React.useState('Inperson meeting');
  const [nextfollowupdate, setNextfollowupdate] = React.useState(new Date());



  const { register, setValue ,control, handleSubmit, reset, formState, watch } = useForm();


  const { _contactdetails,_setOpen } = props
  const classes = useStyles();

  React.useEffect(()=>{
    console.log(_contactdetails);
},[])

 const addLog = (data , _id) => {
  setCurrentid(data)
  setParentid(_id)
  setOpen(true);

 }

 const onSubmit = (values) => {
   console.log(nextfollowupdate);
   values.date = nextfollowupdate
   values.contactdetails = currentid?._id
   values.lead = parentid

   axios.post(`${process.env.REACT_APP_BASE_URL}/log`,values).then(res=>{
    console.log(res);
    setOpen(false) 
    _setOpen(false) // state comming from lead.js for refresh material table
   }).catch(err=>{
     console.log(err);
   })

   


 }

 const showlist = (row,parent_id) => {
  setId({
    contactdetails : row._id,
    _id : parent_id
  })
  setLog(true)
 }


const handleClose = () => {
  setOpen(false);
};

  return (
    <>
   {/* { log && (
    <Showlog _setLog={setLog} _log={log} _id={id}></Showlog>
   )} */}

   { }


     <Dialog
        open={open}
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


      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Contact No</TableCell>
            {/* <TableCell >Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {_contactdetails?.contactdetails.map((row) => (
          
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.phone}</TableCell>
              {/* <TableCell >
                <FiPlus onClick={()=>addLog(row,_contactdetails?._id)}></FiPlus>
                <FiList onClick={()=>showlist(row,_contactdetails?._id)}></FiList>
                </TableCell> */}
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    
    </>
   
  );
}