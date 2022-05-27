import React from 'react'
import TextField from "@material-ui/core/TextField";
import { useForm , useFieldArray } from 'react-hook-form';
import Box from '@mui/material/Box';

import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Grid from '@mui/material/Grid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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


export default function LeadForm({...props}) {
    const { _FormSubmit , _update } = props
    const classes = useStyles()



 const [leadstatus, setLeadstatus] = React.useState('Not Assigned');
 const [status, setStatus] = React.useState('InActive');
 const [type, setType] = React.useState('InActive');
 const [nextfollowupdate, setNextfollowupdate] = React.useState(new Date());

  
    const onSubmit = (values) => {
        values.contactdetails.map(r=>{
            if(r._id == ""){
                delete r._id
            }
        })
        _FormSubmit(values)
     }

         // form validation rules 
    const validationSchema = Yup.object().shape({
        leadname: Yup.string()
            .required('LeadName is required'),
        leadstatus: Yup.string()
        .required('Lead Status is required'),
  
        contactdetails: Yup.array().of(
            Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                email: Yup.string()
                    .email('Email is Invalid')
                    .required('Email is required'),
                phone: Yup.string()
                .required('Phone is required')
            })
        )
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, setValue ,control, handleSubmit, reset, formState, watch } = useForm(formOptions);
    const { errors } = formState;
    const { fields, append, remove } = useFieldArray({ name: 'contactdetails', control });
     // watch to enable re-render when ticket number is changed
     const numberOfTickets = watch('numberOfTickets');
  
     React.useEffect(() => {
      append({ name: "", email: "" , phone : ""})
  }, []);

    React.useEffect(()=>{
    console.log(_update);
      if(_update){
        setValue('leadname' , _update?.leadname)
        setValue('_id' , _update?._id)
        console.log(_update);
      
        setLeadstatus(_update?.leadstatus)

        _update.contactdetails.map((r,i)=>{
           
            setValue(`contactdetails.${i}.name` , r?.name)
            setValue(`contactdetails.${i}.email` , r?.email)
            setValue(`contactdetails.${i}.phone` , r?.phone)
            setValue(`contactdetails.${i}._id` , r?._id)

        })
        setValue('companyname' , _update?.companyname)
        setValue('companyaddress' , _update?.companyaddress)
        setValue('area' , _update?.area)
        setValue('region' , _update?.region)
        setValue('category' , _update?.category)
        setStatus(_update?.status)
        setType(_update?.type)
       
        setValue('product_group' , _update?.product_group)
        setValue('reponsible_person' , _update?.reponsible_person)
        setValue('notes_field' , _update?.notes_field)
     }
    },[_update])
 
  

     
  return (
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField {...register("_id")} style={{ display : 'none'}}></TextField>
                <TextField 
                className = { classes.fieldpadding }
                {...register("leadname")}
                id="outlined-basic" 
                label="Lead Name" 
                variant="outlined" />
                <div className="invalid-feedback">{errors.leadname?.message}</div>


                <FormControl fullWidth className = { classes.fieldpadding } >
                    <InputLabel id="demo-simple-select-label">Lead Status</InputLabel>
                    <Select
                    {...register("leadstatus")}
                    
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={leadstatus}
                    label="Lead Status"
                    onChange={(e)=>setLeadstatus(e.target.value)}
                    >
                    <MenuItem value="Assigned">Assigned</MenuItem>
                    <MenuItem value="Not Assigned">Not Assigned</MenuItem>
                    </Select>
                </FormControl>
                <div className="invalid-feedback">{errors.leadstatus?.message}</div>



                <Box component="div" sx={{ paddingTop : 2}}>

                {fields.map((item, index) => ( 

                    <Grid container direction="row" justifyContent="space-between" key={item.id}>
                    <Grid item>
                        <TextField   {...register(`contactdetails.${index}._id`)} variant="outlined" style={{ display : 'none'}}></TextField>
                    <TextField 
                        className = { classes.fieldpadding }
                        {...register(`contactdetails.${index}.name`)}
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined" />

                        <div className="invalid-feedback">{errors.contactdetails?.[index]?.name?.message}</div>

                    </Grid>
                    <Grid item>
                    <TextField 
                        className = { classes.fieldpadding }
                        {...register(`contactdetails.${index}.email`)}
                        id="outlined-basic" 
                        label="EmailID" 
                        variant="outlined" />
                        <div className="invalid-feedback">{errors.contactdetails?.[index]?.email?.message}</div>
                    </Grid>
                    <Grid item>
                    <TextField 
                        className = { classes.fieldpadding }
                        {...register(`contactdetails.${index}.phone`)}
                        id="outlined-basic" 
                        label="Phone" 
                        variant="outlined" />
                    <div className="invalid-feedback">{errors.contactdetails?.[index]?.phone?.message}</div>

                    </Grid>
                    { index ? (
                        <Grid item > 
                        <Button variant="outlined" onClick={() => remove(index)}>-</Button>
                    </Grid>
                    ):''}
                    

                    </Grid>

                ))}
                <Button variant="outlined" onClick={() => append({ name: "", email: "" , phone : ""})}>Add</Button>

                </Box>

                <TextField 
                className = { classes.fieldpadding }
                {...register("companyname")}
                id="outlined-basic" 
                label="Company Name" 
                variant="outlined" />

                <TextField 
                className = { classes.fieldpadding }
                {...register("companyaddress")}
                id="outlined-basic" 
                label="Company Address" 
                variant="outlined" /> 

                <TextField 
                className = { classes.fieldpadding }
                {...register("area")}
                id="outlined-basic" 
                label="Area" 
                variant="outlined" /> 

                <TextField 
                className = { classes.fieldpadding }
                {...register("region")}
                id="outlined-basic" 
                label="Region" 
                variant="outlined" /> 

                <TextField 
                className = { classes.fieldpadding }
                {...register("category")}
                id="outlined-basic" 
                label="Category" 
                variant="outlined" /> 

                <FormControl fullWidth className = { classes.fieldpadding } >
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                    {...register("status")}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={(e)=>setStatus(e.target.value)}
                    >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="InActive">InActive</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth className = { classes.fieldpadding } >
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                    {...register("type")}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={(e)=>setType(e.target.value)}
                    >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="InActive">InActive</MenuItem>
                    </Select>
                </FormControl>

                <TextField 
                className = { classes.fieldpadding }
                {...register("product_group")}
                id="outlined-basic" 
                label=" Product Group" 
                variant="outlined" /> 

                <TextField 
                className = { classes.fieldpadding }
                {...register("reponsible_person")}
                id="outlined-basic" 
                label="Responsible person" 
                variant="outlined" /> 


                <DatePicker  {...register("nextfollowupdate")} selected={nextfollowupdate} onChange={(date) => setNextfollowupdate(date)} />

                <TextField 
                className = { classes.fieldpadding }
                {...register("notes_field")}
                id="outlined-basic" 
                label="Notes field" 
                variant="outlined" /> 



                <Button variant="outlined" type="submit">Save</Button>

                </form>
    </div>
  )
}
