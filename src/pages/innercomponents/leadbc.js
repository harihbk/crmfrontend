import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import Button from '@mui/material/Button';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@mui/material/Dialog';

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from "@material-ui/core/TextField";
import { useForm , useFieldArray } from 'react-hook-form';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Grid from '@mui/material/Grid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';  




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const useStyles = makeStyles(theme => ({
     topdiv : {
      textAlign : 'right',
      paddingBottom : 5
     },
     formdiv : {
      width : '55%',
      height :'600px',
      overflowY : 'auto'
     },
     fieldpadding:{
         paddingBottom : 10
     }
}));

export default function Lead() {

 const classes = useStyles()
 const [open, setOpen] = React.useState(false);
 const [scroll, setScroll] = React.useState('paper');
 const [opend, setOpend] = React.useState(false);



 
//  const { register, formState: { errors }, handleSubmit } = useForm();

 const [leadstatus, setLeadstatus] = React.useState('');
 const [status, setStatus] = React.useState('');
 const [type, setType] = React.useState('');
 const [nextfollowupdate, setNextfollowupdate] = useState(new Date());



 const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values) => {
   console.log(values);
   axios.post(`${process.env.REACT_APP_BASE_URL}/lead`,values).then(res=>{
    console.log(res);
   }).catch(err=>{
     console.log(err);
   })
}


    // form validation rules 
    const validationSchema = Yup.object().shape({
      leadname: Yup.string()
          .required('LeadName is required'),
      leadstatus: Yup.string()
      .required('Lead Status is required'),

      contactdetails: Yup.array().of(
          Yup.object().shape({
              name: Yup.string()
                  .required('Name is required'),
              email: Yup.string()
                  .email('Email is Invalid')
                  .required('Email is required'),
              phone: Yup.string()
              .required('Phone is required')
          })
      )
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, control, handleSubmit, reset, formState, watch } = useForm(formOptions);
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({ name: 'contactdetails', control });
   // watch to enable re-render when ticket number is changed
   const numberOfTickets = watch('numberOfTickets');

   useEffect(() => {
     console.log("log");
    append({ name: "", email: "" , phone : ""})
}, []);



  return (
    <div>
        <div className={classes.topdiv}>
        <Button variant="outlined" sx={{ textAlign : 'left'}} onClick={handleClickOpen}>ADD</Button>
                <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Add Lead
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                    save
                    </Button>
                </Toolbar>
                </AppBar>

                <List>


                </List>
                
                 <Box sx={{ display : 'flex' , justifyContent : 'center' , alignItems : 'center' , minHeight : '100vh'}}>
                <div className={classes.formdiv}>
                <form onSubmit={handleSubmit(onSubmit)}>

                        <TextField 
                        className = { classes.fieldpadding }
                        {...register("leadname")}
                        id="outlined-basic" 
                        label="Lead Name" 
                        variant="outlined" />
                        <div className="invalid-feedback">{errors.leadname?.message}</div>


                        <FormControl fullWidth className = { classes.fieldpadding } >
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                            {...register("leadstatus")}
                            
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value="Not Assigned"
                            label="Age"
                            onChange={(e)=>setLeadstatus(e.target.value)}
                            >
                            <MenuItem value="Assigned">Assigned</MenuItem>
                            <MenuItem value="Not Assigned">Not Assigned</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="invalid-feedback">{errors.leadstatus?.message}</div>



                        <Box component="div" sx={{ paddingTop : 2}}>

                        {fields.map((item, index) => ( 

                            <Grid container direction="row" justifyContent="space-between" key={item.id}>
                               <Grid item>
                               <TextField 
                                className = { classes.fieldpadding }
                                {...register(`contactdetails.${index}.name`)}
                                id="outlined-basic" 
                                label="Name" 
                                variant="outlined" />

                                <div className="invalid-feedback">{errors.contactdetails?.[index]?.name?.message}</div>

                               </Grid>
                               <Grid item>
                               <TextField 
                                className = { classes.fieldpadding }
                                {...register(`contactdetails.${index}.email`)}
                                id="outlined-basic" 
                                label="EmailID" 
                                variant="outlined" />
                                <div className="invalid-feedback">{errors.contactdetails?.[index]?.email?.message}</div>
                               </Grid>
                               <Grid item>
                               <TextField 
                                className = { classes.fieldpadding }
                                {...register(`contactdetails.${index}.phone`)}
                                id="outlined-basic" 
                                label="Phone" 
                                variant="outlined" />
                              <div className="invalid-feedback">{errors.contactdetails?.[index]?.phone?.message}</div>

                               </Grid>
                               { index ? (
                                <Grid item > 
                                 <Button variant="outlined" onClick={() => remove(index)}>-</Button>
                               </Grid>
                               ):''}
                               

                             </Grid>

                          ))}
                    <Button variant="outlined" onClick={() => append({ name: "", email: "" , phone : ""})}>Add</Button>

                        </Box>

                        <TextField 
                        className = { classes.fieldpadding }
                        {...register("companyname")}
                        id="outlined-basic" 
                        label="Company Name" 
                        variant="outlined" />

                      <TextField 
                        className = { classes.fieldpadding }
                        {...register("companyaddress")}
                        id="outlined-basic" 
                        label="Company Address" 
                        variant="outlined" /> 

                      <TextField 
                        className = { classes.fieldpadding }
                        {...register("area")}
                        id="outlined-basic" 
                        label="Area" 
                        variant="outlined" /> 

                      <TextField 
                        className = { classes.fieldpadding }
                        {...register("region")}
                        id="outlined-basic" 
                        label="Region" 
                        variant="outlined" /> 

                      <TextField 
                        className = { classes.fieldpadding }
                        {...register("category")}
                        id="outlined-basic" 
                        label="Category" 
                        variant="outlined" /> 

                      <FormControl fullWidth className = { classes.fieldpadding } >
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                            {...register("status")}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value="Active"
                            label="Status"
                            onChange={(e)=>setStatus(e.target.value)}
                            >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="InActive">InActive</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth className = { classes.fieldpadding } >
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                            {...register("type")}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value="Active"
                            label="Type"
                            onChange={(e)=>setType(e.target.value)}
                            >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="InActive">InActive</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField 
                        className = { classes.fieldpadding }
                        {...register("product_group")}
                        id="outlined-basic" 
                        label=" Product Group" 
                        variant="outlined" /> 

                      <TextField 
                        className = { classes.fieldpadding }
                        {...register("reponsible_person")}
                        id="outlined-basic" 
                        label="Responsible person" 
                        variant="outlined" /> 


                      <DatePicker  {...register("nextfollowupdate")} selected={nextfollowupdate} onChange={(date) => setNextfollowupdate(date)} />

                      <TextField 
                        className = { classes.fieldpadding }
                        {...register("notes_field")}
                        id="outlined-basic" 
                        label="Notes field" 
                        variant="outlined" /> 

                      

                <Button variant="outlined" type="submit">Save</Button>

                </form>

                </div>
                
                 </Box>

            </Dialog>
        </div>

   <MaterialTable
      title="Remote Data Preview"
      columns={[
        {
          title: 'Avatar',
          field: 'avatar',
          render: rowData => (
            <img
              style={{ height: 36, borderRadius: '50%' }}
              src={rowData.avatar}
            />
          ),
        },
        { title: 'Id', field: 'id' },
        { title: 'First Name', field: 'first_name' },
        { title: 'Last Name', field: 'last_name' },
      ]}
      data={query =>
        new Promise((resolve, reject) => {
          let url = 'https://reqres.in/api/users?'
          url += 'per_page=' + query.pageSize
          url += '&page=' + (query.page + 1)
          fetch(url)
            .then(response => response.json())
            .then(result => {
              resolve({
                data: result.data,
                page: result.page - 1,
                totalCount: result.total,
              })
            })
        })
      }
    />
  </div>
  )
}
