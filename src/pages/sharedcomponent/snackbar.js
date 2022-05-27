import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({...props}) {
  const { snackbaralert , snackbarstate } = props
  const [transition, setTransition] = React.useState(undefined);

  


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    snackbarstate((state)=>{
      state.status = false
    })
  };

 

  return (
     <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={snackbaralert.status} 
      autoHideDuration={3000} 
      onClose={handleClose}
      TransitionComponent={SlideTransition}

      >
        <Alert onClose={handleClose} severity={snackbaralert.severity} sx={{ width: '100%' }}>
         { snackbaralert.text }
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
   
  );
}