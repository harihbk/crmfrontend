import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';  


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function Showlog({...props}) {
  const { _setLog , _log ,_id} = props
  //const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const [ data , setData ] = React.useState([])

  console.log(_id);
 
  const handleClose = () => {
    _setLog(false);
  };

  React.useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}/log?contactdetails=${_id.contactdetails}&lead=${_id._id}`).then(res=>{
      setData(res?.data)
    }).catch(err=>{
        console.log(err);
    })
  },[])

 

  return (
    <React.Fragment>
      
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={_log}
        onClose={handleClose}
      >
        <DialogTitle>Show Logs</DialogTitle>
        <DialogContent>
         
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >


          
                {data?.map((row) => (
                     <Box sx={{ minWidth: 275 , marginBottom : 2 }}>
                       <Card variant="outlined">
                          <CardContent>
                              <Typography variant="body2">
                              Meeting notes : {row?.meeting_notes}
                              </Typography>
                              <Typography variant="body2">
                              Schedule : {row?.schedule}
                              </Typography>
                              <Typography variant="body2">
                              Date : {row?.date}
                              </Typography>
                            </CardContent>
                        </Card>
                      </Box>
                )) }
            


          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
