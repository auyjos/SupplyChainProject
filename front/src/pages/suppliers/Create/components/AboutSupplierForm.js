import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "../../../../components/MDBox";
import FormField from "../../../../components/FormField";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
 
 const AboutSupplierForm = ({handleChange, inputs, isView, formData, }) => {
    const { formField, values, errors, touched, setFieldValue } = formData;
    const { Company, approved, phone, contact } = formField;
    const {
        Company: CompanyV,
        approved: approvedV,
        phone: phoneV,
        contact: contactV,
      } = values;
      useEffect(()=>{
        console.log(values)
      },[])
    return (
        <MDBox mt={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={Company.type} label={Company.label} name={Company.name} 
                    value={CompanyV} error={errors.Company && touched.Company} 
                    success={CompanyV.length > 0 && !errors.Company}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={phone.type} label={phone.label} name={phone.name} 
                    value={phoneV} error={errors.phone && touched.phone} 
                    success={phoneV.length > 0 && !errors.phone}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={contact.type} label={contact.label} name={contact.name} 
                    value={contactV} error={errors.contact && touched.contact} 
                    success={contactV.length > 0 && !errors.contact}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormGroup>
                        <FormControlLabel  control={<Switch name="approved" value={approvedV}  checked={approvedV} disabled={isView} onChange={(event)=>{setFieldValue(approved.name, event.target.checked)}} />} label="Aprobado" />
                    </FormGroup>
                </Grid>
            </Grid>
        </MDBox>
    );
 }

 export default AboutSupplierForm;