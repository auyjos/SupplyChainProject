import React, { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import form from '../schemas/form';
import validations from '../schemas/validations';
import { initialValues, initialValuesFromObj } from '../schemas/initialValues';

import { Formik, Form } from 'formik';

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import MDBox from '../../../../components/MDBox';
import MDButton from '../../../../components/MDButton';

import CreatePersonnelForm from './CreatePersonnelForm';


import { buildData } from '../../../../utils/tableData';

import { Typography } from '@mui/material';


import { getPersonnel, updatePersonnel } from '../../../../Services/PersonnelService';

const InspectionList = () => {
  const { formId, formField } = form;


  const [inputs, setInputs] = useState();

  const [logs, setlogs] = useState(null);
  const [dats, setDats] = useState();



  // get search params
  const [searchparams] = useSearchParams();




  const update = (id, values) => {
    updatePersonnel(id, values)
  }

  const handleSubmit = async (values, actions) => {
    console.log(values)

    //actions.resetForm();
    
  };


  



  useEffect(() => {
    
   

  }, []);

  return (
    <MDBox >
      <>
        <Typography
          variant='h4'
          component='div'
          style={{ marginTop: 25, marginBottom: 15, textAlign: 'center' }}
        >
          Creacion de Empleado
        </Typography>
        
        
        <Card sx ={{width:'100%'}}>
          <Grid container justifyContent='center' sx={{ my: 4 }}>
            <Grid item xs={10} lg={10}>
              
              <Formik
                initialValues={
                  inputs != null && inputs !== undefined
                    ? initialValuesFromObj(inputs)
                    : initialValues
                }
                validationSchema={validations}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                  
                  <Form id={formId} autoComplete='off'>
                      <MDBox p={3}>
                        
                        <CreatePersonnelForm
                          formData={{
                            values,
                            touched,
                            formField,
                            errors,
                            setFieldValue,
                          }}
                        />
                        <MDBox
                          mt={3}
                          width='100%'
                          display='flex'
                          justifyContent='space-between'
                        >
                          <MDButton
                            variant='gradient'
                            color='error'
                            sx={{ height: '100%' }}
                          >
                            Cancelar
                          </MDButton>
                          {/* </Link> */}
                          <MDButton
                            disabled={false}
                            variant='gradient'
                            color='success'
                            type='submit'


                          >
                            Crear
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Card>
      </>

    </MDBox>
  );
};

export default InspectionList;
