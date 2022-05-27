import React ,{ forwardRef } from 'react'
import MaterialTable from 'material-table';
import axios from 'axios';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Button, TextField, Grid, Paper, AppBar, Typography, Toolbar, Link } from "@material-ui/core";
import Adduser from "../user/adduser";
import {  IconButton  } from "@material-ui/core";
import { Dialog, DialogTitle } from '@material-ui/core';
import { HiOutlinePencil  } from "react-icons/hi";
import { BsTrash  } from "react-icons/bs";
import { FaPencilAlt , FaTrashAlt } from "react-icons/fa";
import CustomizedSnackbars from "../sharedcomponent/snackbar"


export default function User() {
    const tableRef = React.createRef();

    const [columns , setColumns] = React.useState([
      { title: "Email", field: "email" },
      { title: "First Name", field: "first_name" },
      { title: "Mobile No", field: "mobile_number" },
      { title: "Username", field: "username" },
      { title: "Designation", field: "designation" },
      { title: "Role", field: "role.slug", grouping: true,
      render: rowData => rowData.role[0].slug } ,
      {
        title : 'Action' , render : rowData => (
          <>  
              <IconButton>
                <HiOutlinePencil className="editIcon" onClick={()=>{onEdit(rowData)}} size={15}></HiOutlinePencil>
              </IconButton>
              <IconButton>
                <BsTrash className="deleteIcon" onClick={()=>{onDelete(rowData)}} size={15}></BsTrash>  
              </IconButton> 
          </>
        )
      }

    ]);
    const [ open , setOpen ] = React.useState(false);
    const [ add , setAdded ] = React.useState(0);
    const [ editdata , setEditdata ] = React.useState(null);
    const [snackbar, setSnackbar] = React.useState({
      status : false,
      text  : null,
      severity : null,
    });


    /*
    Edit Users
    */
   const onEdit = (rowData) => {
    setEditdata(rowData)
    setOpen(true);
   }

      /*
    Delete Users
    */
    const onDelete = (rowData) => {
      console.log(rowData);
     }

    /*
    method calling from child
    */
    const childsubmit = (data) => {
      if (data['_id']){

        axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${data['_id']}`,data).then(d=>{
          // toogle state chage to trigger useeffect
          setAdded(!add)

          setSnackbar((state)=>{
            return {
              status : true,
              text   : 'Users Edited Successfully',
              severity : 'success'
            }
          })


        }).catch(e=>{
          console.log(e.response);
          if(e.response.status == 409){
            setSnackbar((state)=>{
              return {
                status : true,
                text   : `${e.response.data.message}`,
                severity : 'info'
              }
            })
          }
          
          console.log(e);
        })

      } else {

      axios.post(`${process.env.REACT_APP_BASE_URL}/users`,data).then(d=>{
        // toogle state chage to trigger useeffect
        setAdded(!add)

        setSnackbar((state)=>{
          return {
            status : true,
            text   : "User Record Successfully saved.",
            severity : 'success'
          }
        })


      }).catch(e=>{
        console.log(e);
      })

      }




    }
   
    // refresh material table after add
    React.useEffect(()=>{
      tableRef.current.onQueryChange();
    },[add])

  return (
<>
<div className="custCard">
{ snackbar?.status &&  <CustomizedSnackbars snackbaralert={snackbar} snackbarstate={setSnackbar}/>}

    <MaterialTable title="Users"
    tableRef={tableRef}
    actions={[
      {
        icon: 'add',
        onClick: (event, rowData) => {
          setEditdata(null)
          setOpen(true);
        },
        isFreeAction: true,
       
      },
      {
        icon: 'refresh',
        tooltip: 'Refresh Data',
        isFreeAction: true,
        onClick: () => {
          tableRef.current.onQueryChange()
        },
      }
    ]}
    columns={columns}  data={query =>
        new Promise((resolve, reject) => {
          let url = `${process.env.REACT_APP_BASE_URL}/_users`;
          var p = parseInt(query.page) ;
          url += `?page=${p}&limit=${query.pageSize}`;
          axios(url)
            .then(result => {
              console.log(result);
              resolve({
                data: result.data.data,
                page:  result.data.page ,
                totalCount: result.data.total,
              })
            })
        })
      } />

{ open &&  <Adduser _open={open} _setopen={setOpen} _childsubmit={childsubmit} _editdata={editdata} _setEditdata={setEditdata} /> }
      
</div>
</>
  )
}
