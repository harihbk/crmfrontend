import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import TextField from "@material-ui/core/TextField";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"; 
import axios from 'axios';  
import { createSearchParams, useNavigate } from "react-router-dom";


import "./Login.css"

  
export default function Login() {

 const [ errorMessage , setErrorMessage ] = React.useState('');
 const navigate = useNavigate();



 const { register, formState: { errors }, handleSubmit } = useForm();
 const onSubmit = (values) => {
    //process.env.REACT_APP_BASE_URL
    const credentials = {...values , ...{strategy:'local'}}
    axios.post(`${process.env.REACT_APP_BASE_URL}/authentication`,credentials).then(r=>{

    setErrorMessage('');
    const access_token = r.data.accessToken || '';
    const user         = r.data.user || {};
    localStorage.setItem('crm_access_token', access_token);
    localStorage.setItem('crm_access_token', JSON.stringify(user));

   
    //navigate('/forgotpassword');
    }).catch(e=>{

        if(e.response.status == 401){
            setErrorMessage('UserName or Password inValid!');
        } else {
            setErrorMessage('Server not responding');

        }
    })
 }



  return (
    <div className="login" >
        <Grid className="containerheight" container justifyContent="center" alignItems="center">
               <Box
               sx={{
                   width : 400,
                   height : 400,
                   backgroundColor : '#f9f6f6',
                   borderRadius : '5%',
                   display : 'flex',
                   alignItems : 'center',
                   justifyContent : 'center'
               }}
               >
                   
                       
                        

                     <form onSubmit={handleSubmit(onSubmit)}>
                         
                     {errorMessage && (
                     <Typography className="error" sx={{ textAlign : 'center'}}> {errorMessage} </Typography>
                     )}

                    <div className="fieldspadding">
                        <TextField 
                        {...register("email", { 
                            required: "email is required" ,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Enter a valid e-mail address',
                              },
                        
                        })}
                        id="outlined-basic" 
                        label="EmailID" 
                        variant="outlined" />
                         {errors?.email ? <Typography className="error">{errors?.email?.message}</Typography> : null}
                    </div>

                    <div className="fieldspadding">
                        <TextField 
                        {...register("password", { required: true })}
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" />
                       <Typography className="error"> {errors.password?.type === 'required' && "Password is required"} </Typography>
                    </div>

                    <div className="fieldspadding">
                    <Button type="submit" variant="contained" className="button">Login</Button>
                    </div>

                    <div >
                        <Grid container justifyContent="space-between">
                            <Grid></Grid>
                            <Grid><Typography align="right" sx={{ '&:hover':{cursor:'pointer'} }}><Link to="/forgotpassword">Forgot Password</Link></Typography></Grid>
                        </Grid>
                      
                    </div>


                    </form>
               </Box>
        </Grid>
         
    </div>
  )
}
