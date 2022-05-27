import React , { useState } from 'react'
import "./otp.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import OTPInput, { ResendOTP } from "otp-input-react";
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'; 
import { Typography } from '@mui/material';
import { createSearchParams, useNavigate } from "react-router-dom";

export default function Otp() {
    const { _id } = useParams()
    const navigate = useNavigate();


    const [OTP, setOTP] = useState("");
    const [ errorMessage , setErrorMessage ] = React.useState('');

    const getData = () => {
     
    const cong = {
        otp : OTP,
        _id : _id
    }
    axios.get(`${process.env.REACT_APP_BASE_URL}/forgot/${_id}`,{
        params : cong
    }).then(r=>{
        let data = r?.data?.data || {}
         console.log(data);
        if(data.length > 0){
           navigate(`/resetpassword/${r?.data?.token}/${data[0]?._id}`);
          //  navigate()
        }
        console.log(r);
    }).catch(e=>{
        console.log(e);
    })


    }

    const resendotpf = () => {
        let gg = localStorage.getItem("emailcrm");
        const username = JSON.parse(gg).username; 
        const conf = {
            username : username
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/forgot`,conf).then(r=>{
            let data = r?.data || {}
           
        }).catch(e=>{
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
                            <Grid container direction="row" spacing={2} sx={{ display : 'grid' , width:'50%'}}>
                               
                            {errorMessage && (
                                <Grid item>
                                    <Typography>Invalid OTP</Typography>
                                </Grid>
                            )}
  

                                <Grid item>
                                    <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false}  /> 
                                </Grid>
                                <Grid item>
                                    <ResendOTP onResendClick={resendotpf} />
                                </Grid>

                                <Grid>
                                <Button onClick={getData} variant="contained" className="button">Submit</Button>
                                </Grid>
                                                    
                            </Grid>

                           

                                            
                            
                           

                        </Box>
                </Grid> 
        </div>      
  )
}
