
import Grid from "@mui/material/Grid";
import MDBox from "../../../../components/MDBox";
import FormField from "../../../../components/FormField";

const Address = ({handleChange, inputs, isView, formData}) =>{
    const { formField, values, errors, touched } = formData;
    const { address, city, state, zip_code } = formField;
    const {
        address: addressV,
        city: cityV,
        state: stateV,
        zip_code: zip_codeV,
      } = values;
    return(
        <MDBox mt={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <FormField 
                    type={address.type} label={address.label} name={address.name} 
                    value={addressV} error={errors.address && touched.address} 
                    success={addressV.length > 0 && !errors.address}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={city.type} label={city.label} name={city.name} 
                    value={cityV} error={errors.city && touched.city} 
                    success={cityV.length > 0 && !errors.city}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={state.type} label={state.label} name={state.name} 
                    value={stateV} error={errors.state && touched.state} 
                    success={stateV.length > 0 && !errors.state}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={zip_code.type} label={zip_code.label} name={zip_code.name} 
                    value={zip_codeV} error={errors.zip_code && touched.zip_code} 
                    success={zip_codeV.length > 0 && !errors.zip_code}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
            </Grid>
        </MDBox>
    );
}

export default Address;