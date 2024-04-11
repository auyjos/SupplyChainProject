import MDBox from "../../../../components/MDBox";
import FormField from "../../../../components/FormField";

import Grid from "@mui/material/Grid";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useEffect } from "react";

const PODetailForm = ({handleChange, inputs, isView, formData}) => {
    const { formField, values, errors, touched, setFieldValue } = formData;
    const {
        purchase_order,
        inventory,
        description,
        cc,
        condition,
        u_m,
        qty,
        quote,
        disc,
        net,
        total,
    } = formField;
    const {
        purchase_order:purchase_orderV,
        inventory:inventoryV,
        description:descriptionV,
        cc:ccV,
        condition:conditionV,
        u_m:u_mV,
        qty:qtyV,
        quote:quoteV,
        disc:discV,
        net:netV,
        total:totalV,
    } = values;

    const calculateValues = () => {
        // console.log("calc")
        let netValue = qtyV*quoteV
        let totalValue = netValue-(netValue*(discV/100))
        setFieldValue("net", netValue)
        setFieldValue("total", totalValue)
    }

    useEffect(()=>{
        console.log(values)
        calculateValues()
    }, [qtyV, discV, quoteV])

    return(
        <MDBox mt={2}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                    <FormField 
                    type={description.type} label={description.label} name={description.name} 
                    value={descriptionV} error={errors.description && touched.description} 
                    success={descriptionV.length > 0 && !errors.description}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                {/* <Grid item xs={12} md={4}>
                    <FormField 
                    type={cc.type} label={cc.label} name={cc.name} 
                    value={ccV} error={errors.cc && touched.cc} 
                    success={ccV.length > 0 && !errors.cc}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid> */}
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={condition.type} label={condition.label} name={condition.name} 
                    value={conditionV} error={errors.condition && touched.condition} 
                    success={conditionV.length > 0 && !errors.condition}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={u_m.type} label={u_m.label} name={u_m.name} 
                    value={u_mV} error={errors.u_m && touched.u_m} 
                    success={u_mV.length > 0 && !errors.u_m}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={qty.type} label={qty.label} name={qty.name} 
                    value={qtyV} error={errors.qty && touched.qty} 
                    success={qtyV.length > 0 && !errors.qty}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={disc.type} label={disc.label} name={disc.name} 
                    value={discV} error={errors.disc && touched.disc} 
                    success={discV.length > 0 && !errors.disc}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormField 
                    type={quote.type} label={quote.label} name={quote.name} 
                    value={quoteV} error={errors.quote && touched.quote} 
                    success={quoteV.length > 0 && !errors.quote}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={net.type} label={net.label} name={net.name} 
                    value={netV} error={errors.net && touched.net} 
                    success={netV.length > 0 && !errors.net}
                    InputProps={{readOnly: true,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={total.type} label={total.label} name={total.name} 
                    value={totalV} error={errors.total && touched.total} 
                    success={totalV.length > 0 && !errors.total}
                    InputProps={{readOnly: true,}} 
                    />
                </Grid>
            </Grid>
        </MDBox>
    );
}

export default PODetailForm;