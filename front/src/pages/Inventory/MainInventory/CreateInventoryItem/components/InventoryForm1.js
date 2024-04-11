import React, {useState, useEffect} from "react";

import Grid from "@mui/material/Grid";
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from "@mui/material";

import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import FormField from "../../../../../components/FormField";

import { getSuppliersList } from "../../../../../Services/SupplierService"

const InventoryForm1 = ({isView, formData, isUpdate}) => {

    const [options, setOptions] = useState([]);
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState();

    const { formField, values, errors, touched, setFieldValue } = formData;
    const { 
        part_id,
        make,
        nsn,
        market_price,
        list_price,
        client,
        supplier
    } = formField;
    const {
        part_id: part_idV,
        make:makeV,
        nsn: nsnV,
        market_price:market_priceV,
        list_price:list_priceV,
        client:clientV,
        supplier:supplierV,
    } = values;

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

    return (
        <MDBox mt={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={part_id.type} label={part_id.label} name={part_id.name} 
                    value={part_idV} error={errors.part_id && touched.part_id} 
                    success={part_idV.length > 0 && !errors.part_id}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={make.type} label={make.label} name={make.name} 
                    value={makeV} error={errors.make && touched.make} 
                    success={makeV.length > 0 && !errors.make}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={nsn.type} label={nsn.label} name={nsn.name} 
                    value={nsnV} error={errors.nsn && touched.nsn} 
                    success={nsnV.length > 0 && !errors.nsn}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

               
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={list_price.type} label={list_price.label} name={list_price.name} 
                    value={list_priceV} error={errors.list_price && touched.list_price} 
                    success={list_priceV.length > 0 && !errors.list_price}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                { (isView || isUpdate) &&
                    <Grid item xs={12} md={4}>
                        <Typography variant="body2" component="div" >Actual Supp. {supplierV.label} </Typography>
                    </Grid>
                }
                { !(isView) &&
                    <Grid item xs={12} md={6}>
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

                        {/* <FormField 
                        type={supplier.type} label={supplier.label} name={supplier.name} 
                        value={supplierV} error={errors.supplier && touched.supplier} 
                        success={supplierV.length > 0 && !errors.supplier}
                        InputProps={{readOnly: isView,}} 
                        /> */}
                    </Grid>
                }
            </Grid>
        </MDBox>
    )
}

export default InventoryForm1;
