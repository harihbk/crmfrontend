import React , { Component  } from 'react';
import Button from '@mui/material/Button';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';

import "react-datepicker/dist/react-datepicker.css";
import LeadForm from './leadform';
import axios from 'axios';  

import DetailTable from './lead/DetailTable';


import 'react-toastify/dist/ReactToastify.css';

import { FiEye } from "react-icons/fi";

import { HiOutlinePencil  } from "react-icons/hi";
import CustomizedSnackbars from '../sharedcomponent/snackbar';
import Addlog from './lead/Addlog';
import Addmeeting from './lead/Addmetting';
import Leadshow from './lead/Leadshow';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const useStyles = makeStyles(theme => ({
     topdiv : {
      textAlign : 'right',
      paddingBottom : 5
     },
     formdiv : {
      width : '55%',
      height :'600px',
      overflowY : 'auto'
     },
     fieldpadding:{
         paddingBottom : 10
     }
}));

export default function Lead() {

 const classes = useStyles()
 const [open, setOpen] = React.useState(false);
 const [person, setPerson] = React.useState([]);
 const [update, setUpdate] = React.useState('');
 const [ addlogpopup , setAddlogpopup ] = React.useState(false)
 const [ addmeetingpopup , setAddmeetingpopup ] = React.useState(false)
 const [leadshowpopup, setLeadshowpopup] = React.useState(false);

 const [ parentid , setParentid ] = React.useState("")
 const tableRef = React.createRef();


 const [snackbar, setSnackbar] = React.useState({
  status : false,
  text  : null,
  severity : null,
});



 const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const FormSubmit = (values) => {
    setOpen(false);
  //  this.tableRef.current.onQueryChange()
    if(values?._id){
        axios.patch(`${process.env.REACT_APP_BASE_URL}/lead/${values._id}`,values).then(res=>{
          console.log(res);

          setSnackbar((state)=>{
            return {
              status : true,
              text   : "Lead Updated Successfully",
              severity : "success"
            }
          })
     


         }).catch(err=>{
           console.log(err);
         
           setSnackbar((state)=>{
            return {
              status : true,
              text   : "Lead Not Updated",
              severity : "warning"
            }
          })

         })
       } else {

       
              delete values._id
         
        axios.post(`${process.env.REACT_APP_BASE_URL}/lead`,values).then(res=>{
          setSnackbar((state)=>{
            return {
              status : true,
              text   : "Lead Added Successfully",
              severity : "success"
            }
          })
          tableRef.current && tableRef.current.onQueryChange()

         }).catch(err=>{

          setSnackbar((state)=>{
            return {
              status : true,
              text   : "Lead Not Added",
              severity : "warning"
            }
          })


         })
       }
     


  }


  // React.useEffect(()=>{
  //   const maxResults = 20;    
  //   const url = `${process.env.REACT_APP_BASE_URL}/lead?limit=10&skip=0`;
    
  //   axios.get(url)
  //   .then(results => {
  //     setPerson({ person: results.data.data });

     
  //     setPerson(prev => ({
  //       person : prev.person ,
  //       tableArray: results?.data?.data  
  //     }))
  //     console.log(person);
      
  //   });

  // },[open])


  const onEdit = (data) => {
    setUpdate(data)
    setOpen(true);
  } 

  const addlog = (_id) => {
    setParentid(_id)
    setAddlogpopup(true)
  }

  const addmeeting =(_id) => {
    setParentid(_id)
    setAddmeetingpopup(true)
  }

  const onShow = (_id) => {
    setParentid(_id)
    setLeadshowpopup(true)
  }


   // Material Table Columns Rows
   const data = (query) =>(
    new Promise((resolve, reject) => {
      let url = `${process.env.REACT_APP_BASE_URL}/lead?`;
      url += "limit=" + query.pageSize;
      url += "&page=" + (query.page);
      if(query.search){
        url +="&search="+query.search
      }
      
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          resolve({
            data: result.data,
            page: result.page,
            totalCount: result.total,
          });
        });
    }));


  return (
    <div>
                 { snackbar?.status &&  <CustomizedSnackbars snackbaralert={snackbar} snackbarstate={setSnackbar}/>}


        { addlogpopup && <Addlog _setSnackbar={setSnackbar} _addlogpopup={addlogpopup} _setAddlogpopup={setAddlogpopup} _parentid = {parentid}/>}         
        { addmeetingpopup && <Addmeeting _setSnackbar={setSnackbar} _addmeetingpopup={addmeetingpopup} _setAddmeetingpopup={setAddmeetingpopup} _parentid = {parentid}/>}         
        { leadshowpopup && <Leadshow _leadshowpopup={leadshowpopup} _setLeadshowpopup={setLeadshowpopup} _parentid={parentid}/> }


        <div className={classes.topdiv}>
        <Button variant="outlined" sx={{ textAlign : 'left'}} onClick={handleClickOpen}>ADD</Button>
                <Dialog
                fullScreen
                open={open}
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
                    Add Lead
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                    save
                    </Button>
                </Toolbar>
                </AppBar>


             

                
                 <Box sx={{ display : 'flex' , justifyContent : 'center' , alignItems : 'center' , minHeight : '100vh'}}>
                <div className={classes.formdiv}>
               
                 <div>
                  <LeadForm _FormSubmit={FormSubmit} _update={update}/>
                  </div>

                </div>
                
                 </Box>

            </Dialog>
        </div>

         <MaterialTable
          tableRef={tableRef}
          options={{
            grouping: false
          }}
          detailPanel={rowData => {
            return (         
              <DetailTable _contactdetails={rowData} _setOpen={setOpen}/>
            )
          }}
          columns={[
            { title: "Name", field: "leadname", type: "numeric", align: 'left' },            
            { title: "Status", field: "leadstatus"},            
            { title: "Company Name", field: "companyname" },
            {
              title : 'Action' , render : rowData => (
                <>
              <IconButton onClick={()=>{onEdit(rowData)}}>
                      <HiOutlinePencil className="editIcon"  size={15}></HiOutlinePencil>
              </IconButton>

              <IconButton onClick={()=>{onShow(rowData?._id)}}>
                      <FiEye className="editIcon"  size={15}></FiEye>
              </IconButton>

              
              <Button variant="text" onClick={()=>addlog(rowData?._id)}>Add Log</Button>
              <Button variant="text" onClick={()=>addmeeting(rowData?._id)}>Add Meeting</Button>

                </>
              )
            }
          ]}
          data={data}      
          title="Leads"
        /> 
  </div>
  )
}
