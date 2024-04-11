import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";

// formik components
import { Formik, Form } from "formik";

import form from './schemas/form';
import validations from './schemas/validations';
import {initialValues, initialValuesFromObj} from './schemas/initialValues';

import MDBox from '../../../components/MDBox';
import MDTypography from '../../../components/MDTypography';
import MDButton from '../../../components/MDButton';
import SuccessCreatedDialog from '../../../components/SuccessCreatedDialog';
import SnackNotification from '../../../components/SnackNotification';

import StaffForm from './components/StaffForm';

import { getStaffById, addStaff, updateStaff } from '../../../Services/StaffService'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";



const CreateStaff = ({action}) => {
    const params = useParams();
    const [openError, setOpenError] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [inputs, setInputs] = useState();
    const [id, setId] = useState(0)

    const { formId, formField } = form;

    const isAdd = action === "add";
    const isUpdate = action === "update";
    const isView = action === "view";

    const submitForm = async (values, actions) => {
        //console.log(values,action);
            if (action === 'add') {
            addStaff(values).then(resp => {
                console.log(resp.data)
                actions.setSubmitting(false);
                setOpenDialog(true)
            }).catch(err => {
                console.error(err.response);
                setOpenError(true)
            }); 
        }
        else if(isUpdate){
            console.log('UPDATE STAFF');
            updateStaff(id, values).then(resp => {
                console.log('UPDATE STAFF',resp.data);
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

    useEffect(()=>{
        if(params.id != null){
            setId(params.id)
            getStaffById(params.id).then(resp => {
                setInputs(resp.data)
            }).catch(err => {
                console.error(err);
            });
        }
    },[ ]);
    

    return (
        <MDBox pt={3} pb={8}>
            <Grid container justifyContent="center" sx={{ my: 4 }}>
                <Grid item xs={12} lg={8}>
                    <MDBox mt={6} mb={8} textAlign="center">
                        <MDBox mb={1}>
                            <MDTypography variant="h3" fontWeight="bold">
                            { isAdd && "Creacion de Staff" }
                            { isUpdate && "Edicion de Staff" }
                            { isView && "Visualizacion de Staff" }
                            </MDTypography>
                        </MDBox>
                    </MDBox>

                    <Formik
                    initialValues={ inputs != null && inputs != undefined ? initialValuesFromObj(inputs.staff.find(persona => persona.id === parseInt(params.id) )) : initialValues }
                        validationSchema={validations}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                            <Form id={formId} autoComplete="off">
                                <Card>
                                    <MDBox p={3}>
                                        <StaffForm isView={isView} isUpdate={isUpdate} formData={{values,touched,formField, errors,setFieldValue}} />
                                        <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
                                            <Link to="/staff/list" style={{ alignSelf: "start" }} >
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
            <SuccessCreatedDialog open={openDialog} message={ isUpdate ? "Staff Actualizado!" : "Staff Creado!" } route="/staff/list" />
            <SnackNotification  type="error" message="Ha ocurrido un error" closeCallback={console.log()} openFlag={openError} setOpenFlag={setOpenError} />
        </MDBox>
    )
}

export default CreateStaff