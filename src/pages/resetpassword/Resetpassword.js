import React , { useRef } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import TextField from "@material-ui/core/TextField";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"; 
import axios from 'axios'; 
import { createSearchParams, useNavigate } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'



export default function Resetpassword() {
    const { token ,_id } = useParams()
    const [ errorMessage , setErrorMessage ] = React.useState('');
    const navigate = useNavigate();


    const { register,formState : {errors} , handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = async data => {

        const obj = {
            token : token,
            _id   : _id,
            password : data.password
        }
    console.log(obj);

    axios.patch(`${process.env.REACT_APP_BASE_URL}/forgot/${_id}`,obj).then(r=>{
       if(r.data == "token expired"){
        setErrorMessage("Token Expired")
       } else {
        navigate("thankyou")
       }
    }).catch(e=>{
        console.log(e);
    })


    };



//  const onSubmit = (values) => {

//     console.log(values);

//     // axios.post(`${process.env.REACT_APP_BASE_URL}/forgot`,values).then(r=>{
//     //     setErrorMessage('');
//     //     let data = r?.data || {}
//     //     console.log(data);
//     //     localStorage.setItem("emailcrm",JSON.stringify(values))
//     //     navigate(`/otp/${data._id}`);
//     // }).catch(e=>{
//     //     setErrorMessage('Email Id not exist!');
//     // })

//  }


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
                        ref = {password}
                        {...register("password", { 
                            required: "Password is required" ,
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                              }
                        })}

                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined" />
                     {errors?.password ? <Typography className="error">{errors?.password?.message}</Typography> : null}
                </div>

                <div className="fieldspadding">
                    <TextField 
                        {...register("confirmpassword", { 
                            required: "Confirm Password is required" ,
                             validate : value => value === password.current || "The passwords do not match"
                        })}

                    id="outlined-basic" 
                    label="Confirm Password" 
                    variant="outlined" />
                     {errors?.confirmpassword ? <Typography className="error">{errors?.confirmpassword?.message}</Typography> : null}
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
