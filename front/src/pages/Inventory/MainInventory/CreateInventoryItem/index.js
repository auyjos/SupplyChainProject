import React, {useState, useEffect, useLayoutEffect} from "react";
import { Link, useParams } from "react-router-dom";

// formik components
import { Formik, Form } from "formik";

import form from './schemas/form';
import validations from './schemas/validations';
import {initialValues, initialValuesFromObj} from './schemas/initialValues';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

// Material Dashboard 2 PRO React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDButton from "../../../../components/MDButton"

import SuccessCreatedDialog from "../../../../components/SuccessCreatedDialog"

// Wizard page components
import InventoryForm1 from "./components/InventoryForm1";
import InventoryForm2 from "./components/InventoryForm2";
import InventoryForm3 from "./components/InventoryForm3";
import InventoryForm4 from "./components/InventoryForm4";

import SnackNotification from "../../../../components/SnackNotification";

import DataTable from "../../../../components/DataTable"

import { addItem, getItem, updateItem } from "../../../../Services/InventoryService";
import { getPieces, getUniquePieces, deleteItem, sendToScrap } from '../../../../Services/InventoryService'
import {inventoryMainHeaders, inventorySecondHeaders} from "../../../../utils/tableHeaders"
import {buildData} from "../../../../utils/tableData"
import useId from "@mui/material/utils/useId";

function getSteps() {
    return ["Paso 1", "Paso 2", "Paso 3", "Paso 4"];
  }

const CreateInventoryItem = ({action}) => {

    const [openError, setOpenError] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [inputs, setInputs] = useState();

    const [pieces, setPieces] = useState([])
    const [currentSecondPage, setCurrentSecondPage] = useState(1);
    const [totalSecondPages, setTotalSecondPages] = useState();
    const [secondLoading, setSecondLoading] = useState(false);
    const [id, setId] = useState(0)

    const [supp, setSupp] = useState({})

    const params = useParams();

    const { formId, formField } = form;

    const isAdd = action === "add";
    const isUpdate = action === "update";
    const isView = action === "view";

    const submitForm = async (values, actions) => {
        // console.log(values);
        if(isAdd){
            addItem(values).then(resp => {
                console.log(resp.data)
                actions.setSubmitting(false);
                setOpenDialog(true)
            }).catch(err => {
                console.error(err.response);
                setOpenError(true)
            });
        } else if(isUpdate){
            updateItem(id, values).then(resp => {
                console.log(resp.data);
                setOpenDialog(true);
            }).catch(err => {
                console.error(err.response);
                setOpenError(true)
            })
        }
        actions.setSubmitting(false);
    }

    const handleSubmit = (values, actions) => {
            submitForm(values, actions);
    }
    const handleSecondPagination = (event, value) => {
        setCurrentSecondPage(value)
        loadPieces(value, id)
    }

    const loadPieces = (page, partId) => {
        getPieces(page, partId).then(resp => {
            console.log(resp)
            // console.log(buildData(resp.data.inventory, inventorySecondHeaders()))
            setPieces(buildData(resp.data.inventory_detail, inventorySecondHeaders()))
            setCurrentSecondPage(parseInt(resp.data.current_page))
            setTotalSecondPages(resp.data.pages)
            setSecondLoading(false)
        }).catch(err => {
            console.error(err.response)
        })
    }

    useEffect(()=>{
        if(params.id != null){
            setId(params.id)
            getItem(params.id).then(resp => {
                setInputs(resp.data)
                loadPieces(1, params.id)
            }).catch(err => {
                console.error(err);
            });
        }
    },[ ]);

    return(
        <MDBox pt={3} pb={8}>
            <Grid container justifyContent="center" sx={{ my: 4 }}>
                <Grid item xs={12} lg={8}>
                    <MDBox mt={6} mb={8} textAlign="center">
                        <MDBox mb={1}>
                            <MDTypography variant="h3" fontWeight="bold">
                            { isAdd && "Creacion de item" }
                            { isUpdate && "Edicion de item" }
                            { isView && "Visualizacion de item" }
                            </MDTypography>
                        </MDBox>
                        <MDTypography variant="h5" fontWeight="regular" color="secondary">
                            { inputs != null && inputs != undefined &&  inputs.part_id }
                        </MDTypography>
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
                                        <InventoryForm1 isView={isView} isUpdate={isUpdate} formData={{values,touched,formField, errors,setFieldValue}} />
                                        <InventoryForm2 isView={isView} formData={{values,touched,formField, errors,setFieldValue}} />
                                        <InventoryForm3 isView={isView} formData={{values,touched,formField, errors,setFieldValue}} />
                                        <InventoryForm4 isView={isView} formData={{values,touched,formField, errors,setFieldValue}} />
                                        <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
                                            <Link to="/inventory/main" style={{ alignSelf: "start" }} >
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
                    <MDBox my={3}>
                        <Card>
                            { pieces.rows !== undefined && pieces.rows.length > 0 && 
                                <><DataTable  useView useEdit useDelete table={pieces} showTotalEntries={false} entriesPerPage={false} 
                                /> 
                                <MDBox ml={1}><Pagination sx={{ marginTop: "20px", marginBottom: "20px" }} color="info" count={totalSecondPages} page={currentSecondPage} onChange={handleSecondPagination} /> </MDBox> </>}  
                            { secondLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress color="info" size={80} /></Box> }
                            { pieces.rows !== undefined &&  pieces.rows.length === 0 && <Typography variant="h4" component="div" sx={{ margin: "100px" }}>No Existen registros</Typography> }
                        </Card>
                    </MDBox>
                </Grid>
            </Grid>
            
            <SuccessCreatedDialog open={openDialog} message={ isUpdate ? "Item Actualizado!" : "Item Creado!" } route="/inventory/main" />
            <SnackNotification  type="error" message="Ha ocurrido un error" closeCallback={console.log()} openFlag={openError} setOpenFlag={setOpenError} />
        </MDBox>
    )
}

export default CreateInventoryItem;