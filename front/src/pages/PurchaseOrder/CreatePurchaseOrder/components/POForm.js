import React, {useState, useEffect} from "react";
import MDBox from "../../../../components/MDBox"
import FormField from "../../../../components/FormField";

import { Link, useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';

import Checkbox from '@mui/material/Checkbox';

import MDButton from "../../../../components/MDButton";

import { Typography } from "@mui/material";

import { getSuppliersList } from "../../../../Services/SupplierService"
import MDInput from "../../../../components/MDInput";

const POForm = ({handleChange, inputs, isView, formData, isUpdate}) => {
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState();
    const [currencyValue, setCurrencyValue] = useState();
    const [inputCurrencyValue, setInputCurrencyValue] = useState();
    const { formField, values, errors, touched, setFieldValue } = formData;
    const { addressedTo,
        orderFrom,
        shipTo,
        billTo,
        your_reference,
        ship_via,
        pbh_contract,
        supplier,
        default_control_code,
        currency,
        default_expected_date,
        aog,
        reference } = formField;
    const {
        addressedTo: addressedToV,
        orderFrom:orderFromV,
        shipTo:shipToV,
        billTo:billToV,
        your_reference:your_referenceV,
        ship_via:ship_viaV,
        pbh_contract:pbh_contractV,
        supplier:supplierV,
        default_control_code:default_control_codeV,
        currency:currencyV,
        default_expected_date:default_expected_dateV,
        aog:aogV,
        reference:referenceV
    } = values;

    const currencyOptions = [
        "Q",
        "D",
        "E"
    ]

    const loadSuppliers = () => {
        getSuppliersList().then(resp => {
            setOptions(resp.data)
        })
    }

    useEffect(()=> {
        loadSuppliers();
        // setValue(supp.id)
        // setInputValue(supp.label)
        console.log(values)
        // setFieldValue(supplier.name, supplierV.id)

        // setTimeout(()=>{
        //     setValue(supplierV.id)
        //     setInputValue(supplierV.label)
        //     console.log(supplierV)
        //     setFieldValue(supplier.name, supplierV.id)
        // }, 3000)

    }, []); 

    return(
        <MDBox mt={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={your_reference.type} label={your_reference.label} name={your_reference.name} 
                    value={your_referenceV} error={errors.your_reference && touched.your_reference} 
                    success={your_referenceV.length > 0 && !errors.your_reference}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={shipTo.type} label={shipTo.label} name={shipTo.name} 
                    value={shipToV} error={errors.shipTo && touched.shipTo} 
                    success={shipToV.length > 0 && !errors.shipTo}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                
                    {/* <FormField 
                    type={currency.type} label={currency.label} name={currency.name} 
                    value={currencyV} error={errors.currency && touched.currency} 
                    success={currencyV.length > 0 && !errors.currency}
                    InputProps={{readOnly: isView,}} 
                    /> */}
                    { (isView || isUpdate) &&
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" component="div" >Currency. {currencyV} </Typography>
                    </Grid>
                    }
                    { !(isView) &&
                        <Grid item xs={12} md={4}>
                            <Autocomplete options={currencyOptions}
                                value={currencyValue}
                                inputValue={inputCurrencyValue}
                                onChange={(event, newValue) => {
                                    console.log(newValue)
                                    setCurrencyValue(newValue)
                                    setFieldValue(currency.name, newValue)
                                    
                                }}
                                defaultValue={currencyV}
                                onInputChange={(event, newInputValue) => {
                                    setInputCurrencyValue(newInputValue);
                                }}
                                disabled={isView}
                                renderInput={(params) => <MDInput {...params} variant="standard" label={currency.label} /> } 
                            />

                            {/* <FormField 
                            type={supplier.type} label={supplier.label} name={supplier.name} 
                            value={supplierV} error={errors.supplier && touched.supplier} 
                            success={supplierV.length > 0 && !errors.supplier}
                            InputProps={{readOnly: isView,}} 
                            /> */}
                        </Grid>
                    }
                    
                

                <Grid item xs={12} md={4}>
                    <FormField 
                    type={pbh_contract.type} label={pbh_contract.label} name={pbh_contract.name} 
                    value={pbh_contractV} error={errors.pbh_contract && touched.pbh_contract} 
                    success={pbh_contractV.length > 0 && !errors.pbh_contract}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={billTo.type} label={billTo.label} name={billTo.name} 
                    value={billToV} error={errors.billTo && touched.billTo} 
                    success={billToV.length > 0 && !errors.billTo}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={addressedTo.type} label={addressedTo.label} name={addressedTo.name} 
                    value={addressedToV} error={errors.addressedTo && touched.addressedTo} 
                    success={addressedToV.length > 0 && !errors.addressedTo}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormField 
                    type={ship_via.type} label={ship_via.label} name={ship_via.name} 
                    value={ship_viaV} error={errors.ship_via && touched.ship_via} 
                    success={ship_viaV.length > 0 && !errors.ship_via}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={orderFrom.type} label={orderFrom.label} name={orderFrom.name} 
                    value={orderFromV} error={errors.orderFrom && touched.orderFrom} 
                    success={orderFromV.length > 0 && !errors.orderFrom}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={reference.type} label={reference.label} name={reference.name} 
                    value={referenceV} error={errors.reference && touched.reference} 
                    success={referenceV.length > 0 && !errors.reference}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={default_expected_date.type} label={default_expected_date.label} name={default_expected_date.name} 
                    value={default_expected_dateV} error={errors.default_expected_date && touched.default_expected_date} 
                    success={default_expected_dateV.length > 0 && !errors.default_expected_date}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormField 
                    type={default_control_code.type} label={default_control_code.label} name={default_control_code.name} 
                    value={default_control_codeV} error={errors.default_control_code && touched.default_control_code} 
                    success={default_control_codeV.length > 0 && !errors.default_control_code}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                {/* <Grid item xs={12} md={8}>
                    <FormField 
                    type={supplier.type} label={supplier.label} name={supplier.name} 
                    value={supplierV} error={errors.supplier && touched.supplier} 
                    success={supplierV.length > 0 && !errors.supplier}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid> */}
                { (isView || isUpdate) &&
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" component="div" >Actual Supp. {supplierV.label} </Typography>
                    </Grid>
                }
                { !(isView) &&
                    <Grid item xs={12} md={8}>
                        <Autocomplete options={options}
                                value={value}
                                inputValue={inputValue}
                                onChange={(event, newValue) => {
                                    console.log(newValue)
                                    setValue(newValue.id)
                                    setFieldValue(supplier.name, newValue.id)
                                    console.log(supplierV)
                                    
                                }}
                                defaultValue={supplierV}
                                getOptionLabel={(option) => option.label}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                disabled={isView}
                                renderInput={(params) => <MDInput {...params} variant="standard" label={supplier.label} /> } 
                            />
                        <Link to="/suppliers/add" target="_blank" style={{ alignSelf: "start" }} >
                            <MDButton variant="text" color="info" sx={{ height: "100%" }}>
                                Agregar Supp.
                            </MDButton>
                        </Link>
                        <MDButton variant="text" color="info" sx={{ height: "100%" }} onClick={loadSuppliers} >
                            Recargar Supp.
                        </MDButton>
                        {/* <FormField 
                        type={supplier.type} label={supplier.label} name={supplier.name} 
                        value={supplierV} error={errors.supplier && touched.supplier} 
                        success={supplierV.length > 0 && !errors.supplier}
                        InputProps={{readOnly: isView,}} 
                        /> */}
                    </Grid>
                }
                <Grid item xs={12} md={6}>
                    <FormGroup row>
                        <FormControlLabel 
                            control={
                                <Checkbox  checked={aogV}  
                                disabled={isView}
                                onChange={(event) => {
                                    setFieldValue(aog.name, event.target.checked)
                                }}/>
                            } 
                            label={aog.label} />
                    </FormGroup>
                </Grid>
            </Grid>
        </MDBox>
    );
}

export default POForm;