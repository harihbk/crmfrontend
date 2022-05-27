import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useForm } from "react-hook-form";
import {  TextField, Grid } from "@material-ui/core";
import { createStyles , makeStyles , Theme} from '@material-ui/core/styles';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import Select from '@mui/material/Select';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) =>
  createStyles({
    dialogPaper: {
      minHeight: '70vh',
      maxHeight: '70vh',
      minWidth : '120vh',
      maxWidth : '120vh'
  },
  content : {
    width : '100%'
  },
  fullWidth : {
    width : '-webkit-fill-available',
    marginTop : '15px'
  },
  buttonwidth:{
    width : '45%',
    marginTop : '22px'
  }
  }),
);


export default function Adduser(props) {
  const { _open , _setopen ,_childsubmit , _editdata  , _setEditdata } = props;
  const { register , handleSubmit , formState : {errors} , reset} = useForm();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xs');
  const [role , setRole] = React.useState([]);
  const [rolevalue , setRolevalue] = React.useState('');
  const [passwordvalid , setPasswordvalid] = React.useState(true);

  
  

  React.useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}/role`)
    .then(r=>{
      //console.log(r?.data?.data);
      setRole(r?.data?.data);
    })
    .catch(e=>{
      console.log(e);
    })

  },[])

  // Bind Edit Record
  React.useEffect(()=>{
    if(_editdata){
      setPasswordvalid(false)
      
      var newState = Object.assign({}, _editdata);
      delete newState.role;
      reset(newState);
     setRolevalue(_editdata.role[0]._id)

  
  //   _setEditdata(newState)
    }
 },[_editdata])


  const onsubmit = (data) => {
    
    _childsubmit(data)
    _setEditdata(null)
    _setopen(false)
  }

  const classes = useStyles();

  return (
    
    <div>
      
      <Dialog
        open={_open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper : classes.dialogPaper}}
      >
       <Grid container justifyContent="center" alignItems="center" direction="column">
      <DialogTitle>Add User</DialogTitle>
       <DialogContent className={classes.content} >
                        <form>
                            <Grid container direction="row" spacing={5}>
                                <Grid container xs={6} direction="column" >
                                       
                                        <Grid item> 
                                            <TextField
                                                {...register('first_name', { required: true })}
                                                type="text"
                                                placeholder="First Name"
                                                fullWidth
                                                name="first_name"
                                                margin="normal"
                                                variant="outlined"
                                                id="outlined-name"
                                                label="First Name"
                                                autoFocus
                                            />
                                              {errors.first_name && <p>Please check the First Name</p>}

                                        </Grid>
                                        <Grid item> 
                                            <TextField
                                                {...register('empno', { required: true })}
                                                type="text"
                                                placeholder="Emp No"
                                                fullWidth
                                                name="empno"
                                                margin="normal"
                                                variant="outlined"
                                                id="outlined-name"
                                                label="Emp No"
                                                autoFocus
                                            />
                                              {errors.empno && <p>Emp No</p>}

                                        </Grid>
                                        <Grid item> 
                                            <TextField
                                                {...register('mobile_number', { required: 'Mobile No is required' , pattern : { value : /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/ , message : 'Invalid Mobile No'} })}
                                                type="text"
                                                placeholder="Mobile Number"
                                                fullWidth
                                                name="mobile_number"
                                                margin="normal"
                                                variant="outlined"
                                                id="outlined-name"
                                                label="Mobile Number"
                                                autoFocus
                                            />
                                            {errors.mobile_number && <p>{ errors.mobile_number.message }</p>}
                                        </Grid>
                                        <Grid item> 
                                            <TextField
                                                {...register('designation', { required: true })}
                                                type="text"
                                                placeholder="Designation"
                                                fullWidth
                                                name="designation"
                                                margin="normal"
                                                variant="outlined"
                                                id="outlined-name"
                                                label="Designation"
                                                autoFocus
                                            />
                                            {errors.designation && <p>Designation is required</p>}

                                        </Grid>
                                        <Grid item> 
                                            <TextField
                                                {...register('username', { required: true })}
                                                type="text"
                                                placeholder="Username"
                                                fullWidth
                                                name="username"
                                                margin="normal"
                                                variant="outlined"
                                                id="outlined-name"
                                                label="Username"
                                                autoFocus
                                            />
                                            {errors.username && <p>Username is required</p>}
                                        </Grid>
                                    </Grid>  

                                    <Grid container item xs={6} direction="column" >
                                          <Grid item>
                                          <TextField
                                                  {...register('last_name')}
                                                  type="text"
                                                  fullWidth
                                                  name="last_name"
                                                  margin="normal"
                                                  variant="outlined"
                                                  id="outlined-name"
                                                  label="Last Name"
                                                  autoFocus
                                              />
                                          </Grid>

                                        
                                          <Grid item>
                                          <TextField
                                                  {...register('email', { required: true })}
                                                  type="text"
                                                  fullWidth
                                                  name="email"
                                                  margin="normal"
                                                  variant="outlined"
                                                  id="outlined-name"
                                                  label="Email Address"
                                                  autoFocus
                                              />
                                              {errors.email && <p>Email is required</p>}
                                          </Grid>

                                          <Grid item style={{ "marginTop" : '15px' }}>

                                          <FormControl className = { classes.fullWidth} >
                                          <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                                          <Select
                                               fullWidth
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={rolevalue}
                                                label="Role"
                                                {...register('role', { required: true })}
                                                  onChange = {e=>setRolevalue(e.target.value)}
                                              >
                                                <MenuItem value="">
                                                  <em>select</em>
                                                </MenuItem>
                                               { role.map(e=>(
                                                <MenuItem value={e._id}>{e.slug}</MenuItem>
                                               ))}
                                             
                                               
                                              </Select>
                                              </FormControl>
                                              {errors.role && <p>Role is required</p>}
                                          </Grid>

                                          <Grid item style={{ "marginTop" : '10px' }}>
                                          <TextField
                                                  {...register('password', { required: { value : passwordvalid , message : 'Password is required' } , minLength : { value : 5 , message : 'Please Enter atlest 5 character'} })}
                                                  type="text"
                                                  fullWidth
                                                  name="password"
                                                  margin="normal"
                                                  variant="outlined"
                                                  id="outlined-name"
                                                  label="Password"
                                                  autoFocus
                                              />
                                              {errors.password && <p>{ errors.password.message }</p>}
                                          </Grid>


                                          <Grid item style={{ "marginTop" : '15px' }}>

                                            <FormControl className = { classes.fullWidth} >
                                            <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                                            <Select
                                                fullWidth
                                                  labelId="demo-simple-select-helper-label"
                                                  id="demo-simple-select-helper"
                                                  value={rolevalue}
                                                  label="Role"
                                                  {...register('status', { required: true })}
                                                    onChange = {e=>setRolevalue(e.target.value)}
                                                >
                                                  <MenuItem value="">
                                                    <em>select</em>
                                                  </MenuItem>
                                                  <MenuItem value="active">Active</MenuItem>
                                                  <MenuItem value="inactive">InActive</MenuItem>

                                                
                                                </Select>
                                                </FormControl>
                                                {errors.status && <p>Status is required</p>}
                                            </Grid>



                                          <Grid item justifyContent='space-between' alignItems='center' style={{ 'display':'flex','alignContent':'center',alignItems:'center',marginTop:'6%'}}>
                                          
                                          <Button variant="contained" color="primary"  className={classes.buttonwidth} size="medium" onClick={ handleSubmit(onsubmit) }>
                                            Submit
                                          </Button>
                                          <Button variant="outlined" className={classes.buttonwidth} size="medium" onClick={ () => _setopen(false) }>
                                            Cancel
                                          </Button>
                                          </Grid>
                                    </Grid>
                            </Grid>
                        </form>
    </DialogContent>
        </Grid>
        <DialogActions>

    </DialogActions>
      </Dialog>
    </div>
  );
}
