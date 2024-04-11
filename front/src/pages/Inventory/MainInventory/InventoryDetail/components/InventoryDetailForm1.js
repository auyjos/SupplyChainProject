import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from "@mui/material";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import FormField from "../../../../../components/FormField";

import { getSuppliersList } from "../../../../../Services/SupplierService"

const InventoryDetailForm1 = ({isView, formData, isUpdate, po}) => {
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState();
    const { formField, values, errors, touched, setFieldValue } = formData;
    const {
        inventory,
        tracker_id,
        serial_number,
        qty,
        u_m,
        cost,
        freight,
        retail,
        location,
        used_state,
        supplier,
        condition,
        base,
        market_price,
        purchase_price,
        total_cost,
        currency,
        sale_price,
        bill_id,
        waybill,
        po_number,
        ps_number,
    } = formField;

    const {
        inventory: inventoryV,
        tracker_id: tracker_idV,
        serial_number: serial_numberV,
        qty: qtyV,
        u_m: u_mV,
        cost: costV,
        freight: freightV,
        retail: retailV,
        location: locationV,
        used_state:  used_stateV,
        supplier: supplierV,
        condition: conditionV,
        base: baseV,
        market_price: market_priceV,
        purchase_price: purchase_priceV,
        total_cost: total_costV,
        currency: currencyV,
        sale_price:  sale_priceV,
        bill_id: bill_idV,
        waybill: waybillV,
        po_number: po_numberV,
        ps_number:  ps_numberV,
    } = values

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
                {!po &&
                    <Grid item xs={12} md={4}>
                        <FormField 
                        type={inventory.type} label={inventory.label} name={inventory.name} 
                        value={inventoryV} error={errors.inventory && touched.inventory} 
                        success={inventoryV.length > 0 && !errors.inventory}
                        InputProps={{readOnly: true,}} 
                        />
                    </Grid>
                }
                
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={tracker_id.type} label={tracker_id.label} name={tracker_id.name} 
                    value={tracker_idV} error={errors.tracker_id && touched.tracker_id} 
                    success={tracker_idV.length > 0 && !errors.tracker_id}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormField 
                    type={serial_number.type} label={serial_number.label} name={serial_number.name} 
                    value={serial_numberV} error={errors.serial_number && touched.serial_number} 
                    success={serial_numberV.length > 0 && !errors.serial_number}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormField 
                    type={qty.type} label={qty.label} name={qty.name} 
                    value={qtyV} error={errors.qty && touched.qty} 
                    success={qtyV.length > 0 && !errors.qty}
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
                    type={cost.type} label={cost.label} name={cost.name} 
                    value={costV} error={errors.cost && touched.cost} 
                    success={costV.length > 0 && !errors.cost}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={freight.type} label={freight.label} name={freight.name} 
                    value={freightV} error={errors.freight && touched.freight} 
                    success={freightV.length > 0 && !errors.freight}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormField 
                    type={retail.type} label={retail.label} name={retail.name} 
                    value={retailV} error={errors.retail && touched.retail} 
                    success={retailV.length > 0 && !errors.retail}
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

                <Grid item xs={12} md={3}>
                    <FormField 
                    type={condition.type} label={condition.label} name={condition.name} 
                    value={conditionV} error={errors.condition && touched.condition} 
                    success={conditionV.length > 0 && !errors.condition}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={base.type} label={base.label} name={base.name} 
                    value={baseV} error={errors.base && touched.base} 
                    success={baseV.length > 0 && !errors.base}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={market_price.type} label={market_price.label} name={market_price.name} 
                    value={market_priceV} error={errors.market_price && touched.market_price} 
                    success={market_priceV.length > 0 && !errors.market_price}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormField 
                    type={purchase_price.type} label={purchase_price.label} name={purchase_price.name} 
                    value={purchase_priceV} error={errors.purchase_price && touched.purchase_price} 
                    success={purchase_priceV.length > 0 && !errors.purchase_price}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={total_cost.type} label={total_cost.label} name={total_cost.name} 
                    value={total_costV} error={errors.total_cost && touched.total_cost} 
                    success={total_costV.length > 0 && !errors.total_cost}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={currency.type} label={currency.label} name={currency.name} 
                    value={currencyV} error={errors.currency && touched.currency} 
                    success={currencyV.length > 0 && !errors.currency}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={sale_price.type} label={sale_price.label} name={sale_price.name} 
                    value={sale_priceV} error={errors.sale_price && touched.sale_price} 
                    success={sale_priceV.length > 0 && !errors.sale_price}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormField 
                    type={bill_id.type} label={bill_id.label} name={bill_id.name} 
                    value={bill_idV} error={errors.bill_id && touched.bill_id} 
                    success={bill_idV.length > 0 && !errors.bill_id}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={waybill.type} label={waybill.label} name={waybill.name} 
                    value={waybillV} error={errors.waybill && touched.waybill} 
                    success={waybillV.length > 0 && !errors.waybill}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={po_number.type} label={po_number.label} name={po_number.name} 
                    value={po_numberV} error={errors.po_number && touched.po_number} 
                    success={po_numberV.length > 0 && !errors.po_number}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormField 
                    type={ps_number.type} label={ps_number.label} name={ps_number.name} 
                    value={ps_numberV} error={errors.ps_number && touched.ps_number} 
                    success={ps_numberV.length > 0 && !errors.ps_number}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>

            </Grid>
        </MDBox>
    );
}

export default InventoryDetailForm1;