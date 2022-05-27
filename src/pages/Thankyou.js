import { Grid } from '@mui/material'
import React from 'react'
import { Container, makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme=>({
    root : {
       
    },
    containerrs : {
        display : 'flex' ,
        justifyContent :'center',
        alignItems : 'center'
    }
}))

export default function Thankyou() {
    const classes = useStyle();

  return (
    <div className={classes.root}>
        <Grid container className={classes.containerrs} style={{ minHeight : '100vh'}}>
            <Grid item>Thank You ! Your has been changed</Grid>
        </Grid>
    </div>
  )
}
