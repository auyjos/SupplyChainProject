import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";

import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton"
import MDInput from "../../../components/MDInput";
import ContentDialog from "../../../components/ContentDialog"
import SnackNotification from "../../../components/SnackNotification";
import SuccessCreatedDialog from "../../../components/SuccessCreatedDialog";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Autocomplete from '@mui/material/Autocomplete';

import PODetailForm from "./components/PODetailForm"

// formik components
import { Formik, Form } from "formik";

import form from './schemas/form';
import validations from './schemas/validations';
import {initialValues, initialValuesFromObj} from './schemas/initialValues';

import { getAllInventory, getItem } from "../../../Services/InventoryService";
import { addPODetail, getPODetailById, updatePODetail } from "../../../Services/POService"

import { LINKS } from "../../../type/globals"

const CreatePurchaseOrderDetail = ({action}) => {

    const params = useParams();
    const [POSelected, setPOSelected] = useState();

    const [openDialog, setOpenDialog] = useState(false);

    const isAdd = action === "add";
    const isUpdate = action === "update";
    const isView = action === "view";

    //Error Notification
    const [errorMessage, setErrorMessage] = useState("Ha ocurrido un error")
    const [openError, setOpenError] = useState(false);

    //Form
    const { formId, formField } = form;
    const [inputs, setInputs] = useState();

    const handleSubmit = (values, actions) => {
        submitForm(values, actions);
    }

    const submitForm = async (values, actions) => {
        // console.log(values);
        if(isAdd){
            addPODetail(values, POSelected, valueSelected.id).then(resp => {
                console.log(resp.data)
                actions.setSubmitting(false);
                setOpenDialog(true)
            }).catch(err => {
                console.error(err.response);
                setOpenError(true)
            });
        }else if(isUpdate){
            updatePODetail(params.id, values).then(resp => {
                console.log(resp.data);
                setOpenDialog(true);
            }).catch(err => {
                console.error(err.response);
                setOpenError(true)
            })
        }
        actions.setSubmitting(false);
    }

    //Select Inventory
    const [inventoryList, setInventoryList] = useState([]);
    const [openInventorySelector, setOpenInventorySelector] = useState(isAdd)
    const [inventorySelected, setInventorySelected] = useState();
    const [valueSelected, setValueSelected] = useState();
    const closeInventorySelector = () => {
        if(valueSelected !== undefined && valueSelected !== null){
            setOpenInventorySelector(false)
            // loadItem(valueSelected.id)
        }else{
            setErrorMessage("Seleccione un Item")
            setOpenError(true)
        }
        
    }

    const loadInventory = () => {
        getAllInventory().then(resp => {
            setInventoryList(resp.data)
        }).catch(err => {
            console.error(err.response)
        });
    }

    const loadItem = (id) => {
        getItem(id).then(resp => {
            console.log(id)
            setInventorySelected(resp.data)
            setItemFields(resp.data)
        }).catch(err => {
            console.error(err.response)
        });
    }

    const setItemFields = (item) => {
        console.log(item)
        let obj = {
            purchase_order: POSelected,
            inventory: item.id,
            quote:item.list_price,
            qty: 1,
            net: item.list_price,
            total: item.list_price,
            disc: 0,
            description: item.description,
            u_m: item.u_m,
        }
        console.log(obj)
        setInputs(initialValuesFromObj(obj))
    }

    useEffect(() => {
        loadInventory();
        if(params.id != null){
            if(isAdd){
                console.log(params.id)
                setPOSelected(params.id);
            } else if(isUpdate){
                getPODetailById(params.id).then(resp => {
                    console.log(resp.data)
                    setPOSelected(params.po);
                    setInputs(initialValuesFromObj(resp.data))
                }).catch(err => {
                    console.error(err.response)
                });
            }
        }
    },[])

    return(
        <MDBox pt={3} pb={8}>
            <Grid container justifyContent="center" sx={{ my: 4 }}>
                <Grid item xs={12} lg={8}>
                    <MDBox mt={6} mb={8} textAlign="center">
                        <MDBox mb={1}>
                            <MDTypography variant="h3" fontWeight="bold">
                                Creacion de Parte
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                    <Formik
                        initialValues={ inputs != null && inputs != undefined ? initialValuesFromObj(inputs) : initialValues }
                        validationSchema={validations}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                            <Form id={formId} autoComplete="off">
                                <Card>
                                    <MDBox p={3}>
                                        {   <PODetailForm isView={isView}  formData={{values,touched,formField, errors,setFieldValue}} />}
                                        <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
                                            <Link to={POSelected !== undefined && "/purchase_order/view/".concat(POSelected)} style={{ alignSelf: "start" }} >
                                                <MDButton variant="gradient" color="error" sx={{ height: "100%" }}>
                                                    Cancelar
                                                </MDButton>
                                            </Link>
                                            <MDButton
                                                disabled={isView}
                                                variant="gradient"
                                                color="success"
                                                type="submit"
                                                >
                                                Aceptar
                                            </MDButton>
                                        </MDBox>
                                    </MDBox>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
            <ContentDialog open={openInventorySelector} title={"Seleccione el Item que desea Agregar"}  closeCallback={closeInventorySelector} buttonText="Aceptar" >
                <Grid item xs={12} md={12}>
                    <Autocomplete options={inventoryList}
                                onChange={(event, newValue) => {
                                    setValueSelected(newValue)
                                    loadItem(newValue.id)
                                }}
                                renderInput={(params) => <MDInput {...params} variant="standard" label={"Item"} /> }/>
                    <Link to="/inventory/main/add" target="_blank" style={{ alignSelf: "start" }} >
                        <MDButton variant="text" color="info" sx={{ height: "100%" }}>
                            Agregar Item.
                        </MDButton>
                    </Link>
                    <MDButton variant="text" color="info" sx={{ height: "100%" }} onClick={loadInventory} >
                        Recargar Items.
                    </MDButton>
                    <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
                        <MDBox mt={2}>
                            <Link to={POSelected !== undefined && "/purchase_order/view/".concat(POSelected)} style={{ alignSelf: "start" }} >
                                <MDButton variant="gradient" color="error" sx={{ height: "100%" }}>
                                    Cancelar
                                </MDButton>
                            </Link>
                        </MDBox>
                    </MDBox>
                </Grid>
            </ContentDialog>
            <SnackNotification  type="error" message={errorMessage} closeCallback={console.log()} openFlag={openError} setOpenFlag={setOpenError} />
            <SuccessCreatedDialog open={openDialog} message={ isUpdate ? "Parte Actualizada!" : "Parte Creada!" } route={POSelected !== undefined && "/purchase_order/view/".concat(POSelected)} />
        </MDBox>
    );

}

export default CreatePurchaseOrderDetail;