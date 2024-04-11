import React, {useState, useEffect, useLayoutEffect} from "react";
import { Link, useParams } from "react-router-dom";

// formik components
import { Formik, Form } from "formik";

import form from './schemas/form';
import validations from './schemas/validations';
import {initialValues, initialValuesFromObj, initialValuesWithInventory} from './schemas/initialValues';

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

import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDButton from "../../../../components/MDButton"

import SuccessCreatedDialog from "../../../../components/SuccessCreatedDialog"

import InventoryDetailForm1 from "./components/InventoryDetailForm1";
import InventoryDetailForm2 from "./components/InventoryDetailForm2";

import SnackNotification from "../../../../components/SnackNotification";

import { addPiece, getPiece, updatePiece } from '../../../../Services/InventoryService'

import { exportDetailToInventory } from "../../../../Services/POService"

function getSteps() {
    return ["Paso 1", "Paso 2"];
}

const InventoryDetail = ({action, inventory, quarentine, po, poId, closeAction, qty}) => {
    let usedState = inventory ? "I" : "";
    usedState = quarentine ? "Q" : usedState;

    const [openError, setOpenError] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [inputs, setInputs] = useState(initialValuesWithInventory("", usedState));
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const isLastStep = activeStep === steps.length - 1;

    const [part, setPart] = useState(0)
    const [id, setId] = useState(0)

    const params = useParams();

    const { formId, formField } = form;
    const currentValidation = validations[activeStep];

    const handleBack = () => setActiveStep(activeStep - 1);

    const isAdd = action === "add";
    const isUpdate = action === "update";
    const isView = action === "view";

    const submitForm = async (values, actions) => {
        console.log(values);
        if(po){
            console.log(poId)
            exportDetailToInventory(poId,values, qty).then(resp => {
                closeAction()
            }).catch(err => {
                console.error(err.response);
                setOpenError(true)
            });
        }else if(isAdd){
            addPiece(values).then(resp => {
                console.log(resp.data)
                actions.setSubmitting(false);
                setOpenDialog(true)
            }).catch(err => {
                console.error(err.response);
                setOpenError(true)
            });
        } else if(isUpdate){
            console.log("not implemented")
            updatePiece(id, values).then(resp => {
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
        if (isLastStep) {
          submitForm(values, actions);
        } else {
          setActiveStep(activeStep + 1);
          actions.setTouched({});
          actions.setSubmitting(false);
        }
    };

    useEffect(()=>{
        if(params.part != null && !po){
            setPart(params.part)
            console.log("part", params.part)
            setInputs(initialValuesWithInventory(params.part, usedState))
        }
        if(params.id != null && !po){
            setId(params.id)
            getPiece(params.id).then(resp => {
                setInputs(resp.data)
            }).catch(err => {
                console.error(err.response)
            });
        }
    },[]);

    function getStepContent(stepIndex, formData) {
        switch (stepIndex) {
          case 0:
            return <InventoryDetailForm1 isView={isView} isUpdate={isUpdate} formData={formData} po={po} />;
          case 1:
            return <InventoryDetailForm2 isView={isView} formData={formData} />;
          default:
            return null;
        }
      }

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
                            { inputs.tracking_id || "" }
                        </MDTypography>
                    </MDBox>
                    <Formik
                    initialValues={ params.id != null && !po ? initialValuesFromObj(inputs) : inputs }
                    validationSchema={currentValidation}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                    >
                        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                            <Form id={formId} autoComplete="off">
                                <Card>
                                <MDBox mt={-3} mx={2}>
                                    <Stepper activeStep={activeStep} alternativeLabel>
                                        {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                        ))}
                                    </Stepper>
                                </MDBox>
                                <MDBox p={2}>
                                    <MDBox>
                                        {getStepContent(activeStep, {
                                            values,
                                            touched,
                                            formField,
                                            errors,
                                            setFieldValue
                                        })}
                                        <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
                                            {activeStep === 0 ? (
                                                <MDBox />
                                            ) : (
                                                <MDButton variant="outlined" color="dark" onClick={handleBack}>
                                                Atras
                                                </MDButton>
                                            )}
                                                <MDButton
                                                disabled={isSubmitting}
                                                variant="gradient"
                                                color="dark"
                                                type="submit"
                                                >
                                                    {isLastStep ? "Aceptar" : "Siguiente"}
                                                </MDButton>
                                        </MDBox>
                                    </MDBox>
                                </MDBox>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
            <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                {!po && 
                    <Link to="/inventory/main" style={{ alignSelf: "start" }} >
                        <MDButton variant="gradient" color="error" sx={{ height: "100%" }}>
                            Cancelar
                        </MDButton>
                    </Link>
                }
                
            </MDBox>

            <SuccessCreatedDialog open={openDialog} message={ isUpdate ? "Item Actualizado!" : "Item Creado!" } route="/inventory/main" />
        <SnackNotification  type="error" message="Ha ocurrido un error" closeCallback={console.log()} openFlag={openError} setOpenFlag={setOpenError} />
        </MDBox>
    );
}

export default InventoryDetail;