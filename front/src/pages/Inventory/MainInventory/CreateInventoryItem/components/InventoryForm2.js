import Grid from "@mui/material/Grid";
import MDBox from "../../../../../components/MDBox";
import FormField from "../../../../../components/FormField";

const InventoryForm2 = ({ isView, formData }) => {
    const { formField, values, errors, touched } = formData;
    const {
        description,
        model,
        location,
        tariff_code,
    } = formField;
    const {
        description:descriptionV,
        model:modelV,
        location:locationV,
        tariff_code:tariff_codeV,
    } = values;

    return (
        <MDBox mt={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <FormField 
                    type={description.type} label={description.label} name={description.name} 
                    value={descriptionV} error={errors.description && touched.description} 
                    success={descriptionV.length > 0 && !errors.description}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={model.type} label={model.label} name={model.name} 
                    value={modelV} error={errors.model && touched.model} 
                    success={modelV.length > 0 && !errors.model}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormField 
                    type={location.type} label={location.label} name={location.name} 
                    value={locationV} error={errors.location && touched.location} 
                    success={locationV.length > 0 && !errors.location}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={tariff_code.type} label={tariff_code.label} name={tariff_code.name} 
                    value={tariff_codeV} error={errors.tariff_code && touched.tariff_code} 
                    success={tariff_codeV.length > 0 && !errors.tariff_code}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
            </Grid>
        </MDBox>
    )
}

export default InventoryForm2;