import * as React from 'react';
import Button from '@mui/material/Button';
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
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';  

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop : theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Leadshow({...props}) {
  const { _leadshowpopup , _setLeadshowpopup , _parentid } = props;
  const [open, setOpen] = React.useState(false);
  const [ leaddata , setLeaddata ] = React.useState({})

  const handleClickOpen = () => {
    _setLeadshowpopup(true);
  };

  const handleClose = () => {
    _setLeadshowpopup(false);
  };

  React.useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}/lead/${_parentid}`).then(res=>{
        setLeaddata(res?.data)
    }).catch(err=>{
        console.log(err);
    })
  },[_leadshowpopup])



  return (
    <div>
   
      <Dialog
        fullScreen
        open={_leadshowpopup}
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
              List View
            </Typography>
            
          </Toolbar>
        </AppBar>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                        <Item>
                            <Typography variant="h6">Lead Details</Typography>
                            <List>
                                    <ListItem button>
                                        <ListItemText primary="Lead Name" secondary={ leaddata?.leadname ? leaddata?.leadname : '-'} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary="Lead Status" secondary={ leaddata?.leadstatus ? leaddata?.leadstatus : '-'} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary="Company Name" secondary={ leaddata?.companyname ?  leaddata?.companyname : '-'} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary="Company Adderess" secondary={ leaddata?.companyaddress ? leaddata?.companyaddress : '-'} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary="Area" secondary={ leaddata?.area ? leaddata?.area : '-'} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary="Region" secondary={ leaddata?.region ? leaddata?.region : '-'} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary="Category" secondary={ leaddata?.category ?  leaddata?.category : '-'} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary="Status" secondary={ leaddata?.status ? leaddata?.status : '-'} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary="Type" secondary={ leaddata?.type ? leaddata?.type : '-'} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary="Product Group" secondary={ leaddata?.product_group ?  leaddata?.product_group : '-'} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary="Responsible Person" secondary={ leaddata?.reponsible_person ? leaddata?.reponsible_person : '-' } />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary="Notes Field" secondary={ leaddata?.notes_field ?  leaddata?.notes_field : '-'  } />
                                    </ListItem>
                                    <Divider />
                            </List>
                        </Item>
                        </Grid>
                        <Grid item xs={4}>
                        <Item>
                        <Typography variant="h6">Log</Typography>

                            { leaddata?.log?.length > 0 && leaddata?.log.map((data)=>(
                            <Card sx={{ marginBottom: 5 }}>

                                 <List>
                                     <ListItem button>
                                        <ListItemText primary="Schedule" secondary={ data?.schedule ?  data?.schedule : '-'  } />
                                     </ListItem>
                                     <Divider />
                                     <ListItem button>
                                        <ListItemText primary="Schedule Date" secondary={ data?.date ?  data?.date : '-'  } />
                                     </ListItem>
                                     <Divider />
                                     <ListItem button>
                                        <ListItemText primary="Meeting Notes" secondary={ data?.meeting_notes ?  data?.meeting_notes : '-'  } />
                                     </ListItem>

                                </List>
                                </Card>

                            )) }


                        </Item>
                        </Grid>
                        <Grid item xs={4}>
                        <Item>
                            <Typography variant="h6">Meeting Schedule</Typography>
                        { leaddata?.meeting?.length > 0 && leaddata?.meeting.map((data)=>(
                            <Card sx={{ marginBottom: 5 }}>

                                 <List>
                                     <ListItem button>
                                        <ListItemText primary="Agenda of the meet" secondary={ data?.agenda_meeting ?  data?.agenda_meeting : '-'  } />
                                     </ListItem>
                                     <Divider />
                                     <ListItem button>
                                        <ListItemText primary="Contact person" secondary={ data?.contact_person ?  data?.contact_person : '-'  } />
                                     </ListItem>
                                     <Divider />
                                     <ListItem button>
                                        <ListItemText primary="Date and Time" secondary={ data?.date ?  data?.date : '-'  } />
                                     </ListItem>
                                     <Divider />
                                     <ListItem button>
                                        <ListItemText primary="Meeting Link" secondary={ data?.meeting_link ?  data?.meeting_link : '-'  } />
                                     </ListItem>
                                </List>
                            </Card>

                            )) }
                        </Item>
                        </Grid>
                      
                    </Grid>
             </Box>
      </Dialog>
    </div>
  );
}
