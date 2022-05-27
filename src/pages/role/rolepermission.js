import React from 'react'
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
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Rolepermission({...props}) {
    const { _permission , _setpermission , _selectedrole} = props;


    const [open, setOpen] = React.useState(false);
    const [permissiondata, setPermissiondata] = React.useState([]);
    const [checked, setChecked] = React.useState(false);



    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        _setpermission(false);
    };

    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/rolehaspermission/?role=${_selectedrole}`)
        .then(data=>{
        let _data = data.data
        setPermissiondata(_data);
        })
        .catch(e=>{
            console.log(e);
        })
    },_permission)

  const handleChange = (e,data) => {
        let perdata = [...permissiondata];
        perdata[perdata.findIndex(n=>n._id == data._id)]['permission'] = e.target.checked
        setPermissiondata(perdata)
   }

   const handlesave = () => {
    axios.patch(`${process.env.REACT_APP_BASE_URL}/rolehaspermission`,permissiondata)
    .then(d=>{
       console.log(d);
    })
    .catch(e=>{
  console.log(e);
    })

   }


    
  return (
    <div>
         <Dialog
        fullScreen
        open={_permission}
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
              Role Permission
            </Typography>
            <Button autoFocus color="inherit" onClick={handlesave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        { permissiondata.length > 0 && permissiondata.map(data=>(
                <List>
                    <ListItem button>
                        <ListItemText
                            primary={data?.rolepermission?.name}
                        />
                         <Checkbox
                            checked={data.permission}
                            onChange={(e)=>handleChange(e,data)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                    </ListItem>
                    <Divider />

                </List>
        ))  }
       
      </Dialog>
    </div>
  )
}
