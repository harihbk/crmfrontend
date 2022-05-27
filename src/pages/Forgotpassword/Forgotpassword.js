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


import "./Forgotpassword";

export default function Forgotpassword() {

 const { register, formState: { errors }, handleSubmit } = useForm();
 const [ errorMessage , setErrorMessage ] = React.useState('');
 const navigate = useNavigate();


 const onSubmit = (values) => {

    axios.post(`${process.env.REACT_APP_BASE_URL}/forgot`,values).then(r=>{
        setErrorMessage('');
        let data = r?.data || {}
        console.log(data);
        localStorage.setItem("emailcrm",JSON.stringify(values))
        navigate(`/otp/${data._id}`);
    }).catch(e=>{
        setErrorMessage('Email Id not exist!');
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
                    {...register("username", { 
                        required: "Username is required" ,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Enter a valid e-mail address',
                          },
                    
                    })}
                    id="outlined-basic" 
                    label="Username" 
                    variant="outlined" />
                     {errors?.username ? <Typography className="error">{errors?.username?.message}</Typography> : null}
                </div>

                <div className="fieldspadding">
                    <Button type="submit" variant="contained" className="button">Reset</Button>
                    </div>


                <div >
                    <Grid container justifyContent="space-between">
                        <Grid></Grid>
                        <Grid><Typography align="right" sx={{ '&:hover':{cursor:'pointer'} }}><Link to="/">Back to Login</Link></Typography></Grid>
                    </Grid>
                  
                </div>


                </form>
           </Box>
    </Grid>
     
</div>
  )
}
