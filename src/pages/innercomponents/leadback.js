import React , { Component } from 'react';
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

import { forwardRef } from 'react';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import DetailTable from './lead/DetailTable';


import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';



import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const tableIcons = {
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

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


 const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const FormSubmit = (values) => {
       axios.post(`${process.env.REACT_APP_BASE_URL}/lead`,values).then(res=>{
         console.log(res);
        }).catch(err=>{
          console.log(err);
        })
  }


  React.useEffect(()=>{

    const maxResults = 20;    
    const url = `${process.env.REACT_APP_BASE_URL}/lead?limit=10&skip=0`;
    axios.get(url)
    .then(results => {
      setPerson({ person: results.data.data });

      var newArr = results.data.data.map(function(val) {          
        return {
          id: val._id,
          leadname: val.leadname,
          leadstatus: val.leadstatus,
          companyname: val.companyname,   
          contactdetails : val.contactdetails       
        
        };
      });
      setPerson(prev => ({
        person : prev.person ,
        tableArray: newArr  
      }))
      console.log(person);

      // setPerson({
      //   tableArray: newArr  //set state of the weather5days
      // },()=> {
      //    console.log('this.tableArray ',this.state.tableArray);
      // });      
    });

  },[])





  return (
    <div>
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
                  <LeadForm _FormSubmit={FormSubmit}/>
                  </div>

                </div>
                
                 </Box>

            </Dialog>
        </div>

        <MaterialTable
          icons={tableIcons}
          options={{
            grouping: false
          }}
          detailPanel={rowData => {
            return (         
              <TransitionGroup className="todo-list">
              <DetailTable _contactdetails={rowData?.contactdetails}/>
              </TransitionGroup>
            )
          }}
          columns={[
            { title: "Name", field: "leadname", type: "numeric", align: 'left' },            
            { title: "Status", field: "leadstatus"},            
            { title: "Company Name", field: "companyname" },
          ]}
          data={person.tableArray}      
        
          title="Leads"
        />
  </div>
  )
}
