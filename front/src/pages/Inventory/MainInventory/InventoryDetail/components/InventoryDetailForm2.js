import React, {useState, useEffect, useLayoutEffect} from "react";

import Grid from "@mui/material/Grid";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import FormField from "../../../../../components/FormField";


import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

const InventoryDetailForm2 = ({isView, formData}) => {

    const { formField, values, errors, touched, setFieldValue } = formData;

    const {
        expiration_date,
        creation_date,
        register,
        equipment,
        alt_1,
        alt_2,
        alt_3,
        alt_4,
        alt_5,
        currency_from,
        rate,
        control_code,
        adjusted_rate,
        adjusted_market_price,
        adjusted_sale_price,
        adjusted_freight,
        adjusted_total_cost,
        adjusted_total_price,
        file_Logcard,
        file_8130,
        file_FORM1,
        condition_state
    } = formField;

    const {
        expiration_date: expiration_dateV,
        creation_date: creation_dateV,
        register: registerV,
        equipment:  equipmentV,
        alt_1: alt_1V,
        alt_2: alt_2V,
        alt_3: alt_3V,
        alt_4: alt_4V,
        alt_5: alt_5V,
        currency_from: currency_fromV,
        rate: rateV,
        control_code: control_codeV,
        adjusted_rate: adjusted_rateV,
        adjusted_market_price: adjusted_market_priceV,
        adjusted_sale_price: adjusted_sale_priceV,
        adjusted_freight: adjusted_freightV,
        adjusted_total_cost:  adjusted_total_costV,
        adjusted_total_price: adjusted_total_priceV,
        file_Logcard: file_LogcardV,
        file_8130: file_8130V,
        file_FORM1: file_FORM1V,
        condition_state: condition_stateV
    } = values;

    const options = [
        {label:"New", id:"N"},
        {label:"OverHaul", id:"O"},
        {label:"Fixed", id:"F"},
    ]

    const getInputValue = (id) => {
        let label;
        options.forEach(option => {
            if(option.id === id){
                label = option.label;
            }
        })
        return label;
    }
    
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState();

    useEffect(()=>{
        setValue(condition_stateV)
        setInputValue(getInputValue(condition_stateV))
        console.log(values)
    }, [])

    return(
        <MDBox mt={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={register.type} label={register.label} name={register.name} 
                    value={registerV} error={errors.register && touched.register} 
                    success={registerV.length > 0 && !errors.register}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={equipment.type} label={equipment.label} name={equipment.name} 
                    value={equipmentV} error={errors.equipment && touched.equipment} 
                    success={equipmentV.length > 0 && !errors.equipment}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={expiration_date.type} label={expiration_date.label} name={expiration_date.name} 
                    value={expiration_dateV} error={errors.expiration_date && touched.expiration_date} 
                    success={expiration_dateV.length > 0 && !errors.expiration_date}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={creation_date.type} label={creation_date.label} name={creation_date.name} 
                    value={creation_dateV} error={errors.creation_date && touched.creation_date} 
                    success={creation_dateV.length > 0 && !errors.creation_date}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormField 
                    type={alt_1.type} label={alt_1.label} name={alt_1.name} 
                    value={alt_1V} error={errors.alt_1 && touched.alt_1} 
                    success={alt_1V.length > 0 && !errors.alt_1}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={alt_2.type} label={alt_2.label} name={alt_2.name} 
                    value={alt_2V} error={errors.alt_2 && touched.alt_2} 
                    success={alt_2V.length > 0 && !errors.alt_2}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={alt_3.type} label={alt_3.label} name={alt_3.name} 
                    value={alt_3V} error={errors.alt_3 && touched.alt_3} 
                    success={alt_3V.length > 0 && !errors.alt_3}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormField 
                    type={alt_4.type} label={alt_4.label} name={alt_4.name} 
                    value={alt_4V} error={errors.alt_4 && touched.alt_4} 
                    success={alt_4V.length > 0 && !errors.alt_4}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={alt_5.type} label={alt_5.label} name={alt_5.name} 
                    value={alt_5V} error={errors.alt_5 && touched.alt_5} 
                    success={alt_5V.length > 0 && !errors.alt_5}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormField 
                    type={currency_from.type} label={currency_from.label} name={currency_from.name} 
                    value={currency_fromV} error={errors.currency_from && touched.currency_from} 
                    success={currency_fromV.length > 0 && !errors.currency_from}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={rate.type} label={rate.label} name={rate.name} 
                    value={rateV} error={errors.rate && touched.rate} 
                    success={rateV.length > 0 && !errors.rate}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={control_code.type} label={control_code.label} name={control_code.name} 
                    value={control_codeV} error={errors.control_code && touched.control_code} 
                    success={control_codeV.length > 0 && !errors.control_code}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete options={options}
                        value={value}
                        inputValue={inputValue}
                        onChange={(event, newValue) => {
                            setValue(newValue.id)
                            setFieldValue(condition_state.name, newValue.id)
                            console.log("onchange")
                            
                        }}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            console.log(newInputValue)
                          }}
                        renderInput={(params) => <MDInput {...params} variant="standard" label={condition_state.label} /> } 
                    />
                    {/* <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{condition_state.label}</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={condition_stateV}
                        label={condition_state.label}
                        onChange={(event) => {
                            console.log(event.target.value)
                            //setFieldValue(condition_state.name, event.target.value)
                        }}
                        >
                            <MenuItem value="N">New</MenuItem>
                        </Select>
                    </FormControl> */}

                    {/* <FormField 
                    type={condition_state.type} label={condition_state.label} name={condition_state.name} 
                    value={condition_stateV} error={errors.condition_state && touched.condition_state} 
                    success={condition_stateV.length > 0 && !errors.condition_state}
                    InputProps={{readOnly: isView,}}
                    /> */}
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormField 
                    type={adjusted_rate.type} label={adjusted_rate.label} name={adjusted_rate.name} 
                    value={adjusted_rateV} error={errors.alt_1 && touched.adjusted_rate} 
                    success={adjusted_rateV.length > 0 && !errors.adjusted_rate}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={adjusted_market_price.type} label={adjusted_market_price.label} name={adjusted_market_price.name} 
                    value={adjusted_market_priceV} error={errors.adjusted_market_price && touched.adjusted_market_price} 
                    success={adjusted_market_priceV.length > 0 && !errors.adjusted_market_price}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={adjusted_sale_price.type} label={adjusted_sale_price.label} name={adjusted_sale_price.name} 
                    value={adjusted_sale_priceV} error={errors.adjusted_sale_price && touched.adjusted_sale_price} 
                    success={adjusted_sale_priceV.length > 0 && !errors.adjusted_sale_price}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormField 
                    type={adjusted_total_cost.type} label={adjusted_total_cost.label} name={adjusted_total_cost.name} 
                    value={adjusted_total_costV} error={errors.adjusted_total_cost && touched.adjusted_total_cost} 
                    success={adjusted_total_costV.length > 0 && !errors.adjusted_total_cost}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={adjusted_freight.type} label={adjusted_freight.label} name={adjusted_freight.name} 
                    value={adjusted_freightV} error={errors.adjusted_freight && touched.adjusted_freight} 
                    success={adjusted_freightV.length > 0 && !errors.adjusted_freight}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={adjusted_total_price.type} label={adjusted_total_price.label} name={adjusted_total_price.name} 
                    value={adjusted_total_priceV} error={errors.adjusted_total_price && touched.adjusted_total_price} 
                    success={adjusted_total_priceV.length > 0 && !errors.adjusted_total_price}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormGroup row>
                    <FormControlLabel 
                        control={
                            <Checkbox  checked={file_LogcardV}  
                            disabled={isView}
                            onChange={(event) => {
                                setFieldValue(file_Logcard.name, event.target.checked)
                            }}/>
                        } 
                        label={file_Logcard.label} />
                        <FormControlLabel 
                        control={
                            <Checkbox  checked={file_8130V}  
                            disabled={isView}
                            onChange={(event) => {
                                setFieldValue(file_8130.name, event.target.checked)
                            }}/>
                        } 
                        label={file_8130.label} />
                        <FormControlLabel 
                        control={
                            <Checkbox  checked={file_FORM1V}  
                            disabled={isView}
                            onChange={(event) => {
                                setFieldValue(file_FORM1.name, event.target.checked)
                            }}/>
                        } 
                        label={file_FORM1.label} />
                    </FormGroup>
                </Grid>

            </Grid>
        </MDBox>
    );
}

export default InventoryDetailForm2;