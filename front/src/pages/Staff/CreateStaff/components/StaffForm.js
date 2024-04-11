import React, {useState, useEffect} from "react";

import Grid from "@mui/material/Grid";
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from "@mui/material";

import MDBox from '../../../../components/MDBox';
import MDInput from '../../../../components/MDInput';
import FormField from '../../../../components/FormField';

import { getStaffList } from '../../../../Services/StaffService';

const StaffForm = ({isView, formData, isUpdate}) => {
    const { formField, values, errors, touched, setFieldValue } = formData;
    const { 
        name,
        authorization,
        initial
    } = formField;
    
    const {
        name:nameV,
        authorization:authorizationV,
        initial:initialV,
    } = values;

    const [clientOptions, setClientOptions] = useState([]);
    const [clientValue, setClientValue] = useState();
    const [clientInputValue, setClientInputValue] = useState();

    const loadStaff = () => {
        getStaffList().then(resp => {
            setClientOptions(resp.data)
        })
    }

    useEffect(()=> {
        loadStaff();
    }, []);

  return (
    <MDBox mt={2}>
        <Grid container spacing={3}>
              
            <Grid item xs={12} md={4}>
                <FormField 
                    type={name.type} label={name.label} name={name.name} 
                    value={nameV} error={errors.name && touched.name} 
                    success={nameV ? nameV : errors.name}
                    InputProps={{readOnly: isView,}} 
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <FormField 
                    type={authorization.type} label={authorization.label} name={authorization.name} 
                    value={authorizationV} error={errors.authorization && touched.authorization} 
                    success={authorizationV ?authorizationV:errors.authorization}
                    InputProps={{readOnly: isView,}} 
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <FormField 
                    type={initial.type} label={initial.label} name={initial.name} 
                    value={initialV} error={errors.initial && touched.initial} 
                    success={initialV?initialV:errors.initial}
                    InputProps={{readOnly: isView,}} 
                />
            </Grid>
        </Grid>
    </MDBox>
  )
}

export default StaffForm; 