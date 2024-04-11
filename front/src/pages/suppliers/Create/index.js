/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
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

// Material Dashboard 2 PRO React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";

// Wizard page components
import About from "./components/AboutSupplierForm";
import AddressSupplierForm from "./components/AddressSupplierForm";

import { getDefaultObject, getSupplier, addSuppliers, updateSupplier } from '../../../Services/SupplierService'

import SuccessCreatedDialog from "../../../components/SuccessCreatedDialog"
import SnackNotification from "../../../components/SnackNotification";

function getSteps() {
  return ["Informacion", "Direccion"];
}

function CreateSupplier( {action} ) {

  const [openError, setOpenError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [inputs, setInputs] = useState(getDefaultObject());
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const params = useParams();

  const { formId, formField } = form;
  const currentValidation = validations[activeStep];

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  const isAdd = action === "add";
  const isUpdate = action === "update";
  const isView = action === "view";

  const submitForm = async (values, actions) => {
    console.log(values);
    if(isAdd){
      addSuppliers(values).then((resp) => {
        console.log(resp)
        actions.setSubmitting(false);
        setOpenDialog(true)
      }).catch((err) => {
        console.error(err.response);
        setOpenError(true)
      })
    }else if(isUpdate){
      updateSupplier(values, params.id).then(resp => {
        console.log(resp)
        actions.setSubmitting(false)
        setOpenDialog(true)
      }).catch(err => {
        console.error(err.response)
        setOpenError(true)
      });
    }
    // actions.setSubmitting(false);
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

  const handleChange = (event) => {
    const name = event.target.name;
    const value =  name === "approved" ? event.target.checked : event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const saveInfo = () => {
    console.log(inputs);
    addSuppliers(inputs).then((resp) => {
      console.log(resp)
      setOpenDialog(true)
    }).catch((err) => {
      console.error(err.response);
    });
  }

  useEffect(()=>{
    if(params.id != null){
        getSupplier(params.id).then((resp) => {
          setInputs(resp.data)
        }).catch((err) => {
          console.error(err);
        });
    }
},[])

  function getStepContent(stepIndex, formData) {
    switch (stepIndex) {
      case 0:
        return <About handleChange={handleChange}  inputs={inputs} isView={isView} formData={formData}/>;
      case 1:
        return <AddressSupplierForm handleChange={handleChange}  inputs={inputs} isView={isView} formData={formData}/>;
      default:
        return null;
    }
  }

  return (
      <MDBox pt={3} pb={8}>
        <Grid container justifyContent="center" sx={{ my: 4 }}>
          <Grid item xs={12} lg={8}>
            <MDBox mt={6} mb={8} textAlign="center">
              <MDBox mb={1}>
                <MDTypography variant="h3" fontWeight="bold">
                  { isAdd && "Creacion de Proveedor" }
                  { isUpdate && "Edicion de Proveedor" }
                  { isView && "Visualizacion de Proveedor" }
                </MDTypography>
              </MDBox>
              <MDTypography variant="h5" fontWeight="regular" color="secondary">
                { inputs.Company || "" }
              </MDTypography>
            </MDBox>
            <Formik
              initialValues={ params.id != null ? initialValuesFromObj(inputs) : initialValues }
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
                              setFieldValue,
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
          <Link to="/clandsu/list" style={{ alignSelf: "start" }} >
            <MDButton variant="gradient" color="error" sx={{ height: "100%" }}>
              Cancelar
            </MDButton>
            </Link>
          </MDBox>
        
        <SuccessCreatedDialog open={openDialog} message={ isUpdate ? "Proveedor Actualizado!" : "Proveedor Creado!" } route="/clandsu/list" />
        <SnackNotification  type="error" message="Ha ocurrido un error" closeCallback={console.log()} openFlag={openError} setOpenFlag={setOpenError} />
      </MDBox>
  );
}

export default CreateSupplier;
