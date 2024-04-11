import Grid from "@mui/material/Grid";
import MDBox from "../../../../../components/MDBox";
import FormField from "../../../../../components/FormField";

const InventoryForm3 = ({isView, formData}) => {
    const { formField, values, errors, touched } = formData;
    const {
        amount,
        min_amount,
        max_amount,
        type,
        u_m,
        weight,
        weight_type,
    } = formField;
    const {
        amount:amountV,
        min_amount:min_amountV,
        max_amount:max_amountV,
        type:typeV,
        u_m:u_mV,
        weight:weightV,
        weight_type:weight_typeV,
    } = values;

    return(
        <MDBox mt={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={amount.type} label={amount.label} name={amount.name} 
                    value={amountV} error={errors.amount && touched.amount} 
                    success={amountV.length > 0 && !errors.amount}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={min_amount.type} label={min_amount.label} name={min_amount.name} 
                    value={min_amountV} error={errors.min_amount && touched.min_amount} 
                    success={min_amountV.length > 0 && !errors.min_amount}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={max_amount.type} label={max_amount.label} name={max_amount.name} 
                    value={max_amountV} error={errors.max_amount && touched.max_amount} 
                    success={max_amountV.length > 0 && !errors.max_amount}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormField 
                    type={type.type} label={type.label} name={type.name} 
                    value={typeV} error={errors.type && touched.type} 
                    success={typeV.length > 0 && !errors.type}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={u_m.type} label={u_m.label} name={u_m.name} 
                    value={u_mV} error={errors.u_m && touched.u_m} 
                    success={u_mV.length > 0 && !errors.u_m}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={weight.type} label={weight.label} name={weight.name} 
                    value={weightV} error={errors.weight && touched.weight} 
                    success={weightV.length > 0 && !errors.weight}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={weight_type.type} label={weight_type.label} name={weight_type.name} 
                    value={weight_typeV} error={errors.weight_type && touched.weight_type} 
                    success={weight_typeV.length > 0 && !errors.weight_type}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
            </Grid>
        </MDBox>
    )

}

export default InventoryForm3;