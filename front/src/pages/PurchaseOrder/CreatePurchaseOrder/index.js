import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import form from './schemas/form';
import validations from './schemas/validations';
import { initialValues, initialValuesFromObj } from './schemas/initialValues';

// formik components
import { Formik, Form } from 'formik';

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';
import { TextField } from '@mui/material';

import MDBox from '../../../components/MDBox';
import MDTypography from '../../../components/MDTypography';
import MDButton from '../../../components/MDButton';

import SuccessCreatedDialog from '../../../components/SuccessCreatedDialog';
import ContentDialog from '../../../components/ContentDialog';

import InventoryDetail from '../../Inventory/MainInventory/InventoryDetail';

// Wizard page components
import POForm from './components/POForm';

import SnackNotification from '../../../components/SnackNotification';
import DeleteDialog from '../../../components/DeleteDialog';
import DataTable from '../../../components/DataTable';

import {
  addPO,
  getPOByID,
  getPODetail,
  addPOItem,
  updatePO,
  deletePODetail,
  getPONotes,
  createNote,
} from '../../../Services/POService';

//Utils
import { buildData } from '../../../utils/tableData';
import { POHeaders, PODetails, PONotes } from '../../../utils/tableHeaders';

const CreatePurchaseOrder = ({ action }) => {
  const [openError, setOpenError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [inputs, setInputs] = useState();

  const [PODetail, setPODetail] = useState([]);
  const [currentSecondPage, setCurrentSecondPage] = useState(1);
  const [totalSecondPages, setTotalSecondPages] = useState();
  const [secondLoading, setSecondLoading] = useState(false);
  const [id, setId] = useState(0);
  const [newId, setNewId] = useState(0);

  const [notes, setNotes] = useState([]);
  const [currentNotesPage, setCurrentNotesPage] = useState(1);
  const [totalNotesPages, setTotalNotesPages] = useState();
  const [notesLoading, setNotesLoading] = useState(false);

  const params = useParams();

  const { formId, formField } = form;

  const isAdd = action === 'add';
  const isUpdate = action === 'update';
  const isView = action === 'view';

  const submitForm = async (values, actions) => {
    if (isAdd) {
      addPO(values)
        .then((resp) => {
          setNewId(resp.data.id);
          actions.setSubmitting(false);
          setOpenDialog(true);
        })
        .catch((err) => {
          setOpenError(true);
        });
    } else if (isUpdate) {
      updatePO(id, values)
        .then((resp) => {
          setNewId(resp.data.id);
          setOpenDialog(true);
        })
        .catch((err) => {
          setOpenError(true);
        });
    }
    actions.setSubmitting(false);
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };
  const handleSecondPagination = (event, value) => {
    setCurrentSecondPage(value);
    loadPODetail(value, id);
  };

  const loadPODetail = (page, POId) => {
    getPODetail(page, POId)
      .then((resp) => {
        setPODetail(buildData(resp.data.POs_details, PODetails()));
        setCurrentSecondPage(parseInt(resp.data.current_page));
        setTotalSecondPages(resp.data.pages);
        setSecondLoading(false);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  const loadNotes = (page, POId) => {
    getPONotes(params.id)
      .then((resp) => {
        setNotes(buildData(resp.data.notes, PONotes()));
        setCurrentNotesPage(parseInt(resp.data.current_page));
        setTotalNotesPages(resp.data.pages);
        setNotesLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (params.id != null) {
      setId(params.id);
      getPOByID(params.id)
        .then((resp) => {
          setInputs(resp.data);
          loadPODetail(1, params.id);
          loadNotes(1, params.id);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const [idCreated, setIdCreated] = useState();
  const [idToCreated, setIdToCreated] = useState();
  const [openCreate, setOpenCreate] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  const [qty, setQty] = useState();
  const [openQty, setOpenQty] = useState(true);

  const selectPO = (item) => {
    setIdToCreated(item.id);
    setOpenCreate(true);
  };

  const closeCreate = () => {
    setOpenCreate(false);
    setOpenMessage(true);
    setQty(0);
    setOpenQty(true);
  };

  const closeOpenMessage = () => {
    setIdCreated('');
    setOpenMessage(false);
  };

  const editRegister = (item) => {
    let route = '/purchase_order/detail/update/';
    window.location.replace(
      route.concat(params.id).concat('/'.concat(item.id))
    );
  };

  const [registerToDetele, setRegisterToDelete] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const deleteRegister = (register) => {
    setRegisterToDelete(register);
    setOpenDeleteDialog(true);
  };

  //Calbacks to Delete dialog
  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const successDeleteDialog = () => {
    deletePODetail(registerToDetele.id)
      .then((resp) => {
        loadPODetail(currentSecondPage, params.id);
      })
      .catch((err) => {
        console.error(err);
      });
    setOpenDeleteDialog(false);
  };

  const [openCreatenNote, setOpenCreateNote] = useState(false);
  const [noteInputs, setNoteInputs] = useState({ purchase_order: params.id });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNoteInputs((values) => ({ ...values, [name]: value }));
  };

  const closeModals = () => {
    setOpenCreateNote(false);
    setNoteInputs({ purchase_order: params.id });
  };

  const createNotes = () => {
    createNote(noteInputs)
      .then((resp) => {
        loadNotes(1, params.id);
        closeModals();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <MDBox pt={3} pb={8}>
      <Grid container justifyContent='center' sx={{ my: 4 }}>
        <Grid item xs={12} lg={8}>
          <MDBox mt={6} mb={8} textAlign='center'>
            <MDBox mb={1}>
              <MDTypography variant='h3' fontWeight='bold'>
                {isAdd && 'Creacion de Orden'}
                {isUpdate && 'Edicion de Orden'}
                {isView && 'Visualizacion de Orden'}
              </MDTypography>
            </MDBox>
            {inputs != null && inputs !== undefined && (
              <div>
                <MDBox
                  mb={1}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='flex-start'
                >
                  <MDTypography
                    variant='span'
                    fontWeight='regular'
                    color='secondary'
                  >
                    No. {inputs.id}
                  </MDTypography>
                  <MDTypography
                    variant='span'
                    fontWeight='regular'
                    color='secondary'
                  >
                    Date: {inputs.created_at}
                  </MDTypography>
                  <MDTypography
                    variant='span'
                    fontWeight='regular'
                    color='secondary'
                  >
                    Created By: {inputs.user.name}
                  </MDTypography>
                </MDBox>
                <Divider sx={{ margin: '0.5rem 0' }} />
              </div>
            )}
          </MDBox>
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
                <Card>
                  <MDBox p={3}>
                    <POForm
                      isView={isView}
                      isUpdate={isUpdate}
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
                      <Link
                        to='/purchase_order/list'
                        style={{ alignSelf: 'start' }}
                      >
                        <MDButton
                          variant='gradient'
                          color='error'
                          sx={{ height: '100%' }}
                        >
                          Cancelar
                        </MDButton>
                      </Link>
                      <MDButton
                        disabled={isView}
                        variant='gradient'
                        color='success'
                        type='submit'
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
            <MDBox mb={1}>
              <MDTypography variant='h5' fontWeight='bold'>
                Partes
              </MDTypography>
            </MDBox>
            <MDBox
              display='flex'
              justifyContent='space-between'
              alignItems='flex-start'
              mb={2}
            >
              {!isAdd && (
                <Link to={'/purchase_order/detail/create/'.concat(id)}>
                  <MDButton variant='gradient' color='info'>
                    Agregar
                  </MDButton>
                </Link>
              )}
            </MDBox>
            <Card>
              {PODetail.rows !== undefined && PODetail.rows.length > 0 && (
                <>
                  <DataTable
                    useActions
                    useAdd
                    useEdit
                    useDelete
                    deleteAction={deleteRegister}
                    editAction={editRegister}
                    addAction={selectPO}
                    table={PODetail}
                    showTotalEntries={false}
                    entriesPerPage={false}
                  />
                  <MDBox ml={1}>
                    <Pagination
                      sx={{ marginTop: '20px', marginBottom: '20px' }}
                      color='info'
                      count={totalSecondPages}
                      page={currentSecondPage}
                      onChange={handleSecondPagination}
                    />{' '}
                  </MDBox>{' '}
                </>
              )}
              {secondLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '200px',
                  }}
                >
                  <CircularProgress color='info' size={80} />
                </Box>
              )}
              {PODetail.rows !== undefined && PODetail.rows.length === 0 && (
                <Typography
                  variant='h4'
                  component='div'
                  sx={{ margin: '100px' }}
                >
                  No Existen registros
                </Typography>
              )}
            </Card>
          </MDBox>
          <MDBox my={3}>
            <MDBox mb={1}>
              <MDTypography variant='h5' fontWeight='bold'>
                Notes
              </MDTypography>
            </MDBox>
            <MDBox
              display='flex'
              justifyContent='space-between'
              alignItems='flex-start'
              mb={2}
            >
              {!isAdd && (
                <MDButton
                  variant='gradient'
                  color='info'
                  onClick={() => {
                    setOpenCreateNote(true);
                  }}
                >
                  Agregar
                </MDButton>
              )}
            </MDBox>
            <Card>
              {notes.rows !== undefined && notes.rows.length > 0 && (
                <>
                  <DataTable
                    table={notes}
                    showTotalEntries={false}
                    entriesPerPage={false}
                  />
                  <MDBox ml={1}>
                    <Pagination
                      sx={{ marginTop: '20px', marginBottom: '20px' }}
                      color='info'
                      count={totalNotesPages}
                      page={currentNotesPage}
                      onChange={handleSecondPagination}
                    />{' '}
                  </MDBox>{' '}
                </>
              )}
              {notesLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '200px',
                  }}
                >
                  <CircularProgress color='info' size={80} />
                </Box>
              )}
              {notes.rows !== undefined && notes.rows.length === 0 && (
                <Typography
                  variant='h4'
                  component='div'
                  sx={{ margin: '100px' }}
                >
                  No Existen registros
                </Typography>
              )}
            </Card>
          </MDBox>
        </Grid>
      </Grid>
      <ContentDialog
        open={openCreatenNote}
        title={'Note'}
        closeCallback={closeModals}
      >
        <MDBox p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <MDBox mb={1.5}>
                <TextField
                  value={noteInputs.note || ''}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  sx={{ width: '100%' }}
                  id='qty'
                  InputProps={{ name: 'note' }}
                  label='Note'
                  variant='outlined'
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <MDBox mb={1.5}>
                <TextField
                  value={noteInputs.cost || ''}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  sx={{ width: '100%' }}
                  id='price'
                  InputProps={{ name: 'cost' }}
                  label='Cost'
                  variant='outlined'
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox
          mt={3}
          width='100%'
          display='flex'
          justifyContent='space-between'
        >
          <MDBox mt={2}>
            <MDButton
              variant='gradient'
              color='success'
              type='submit'
              onClick={createNotes}
            >
              Aceptar
            </MDButton>
          </MDBox>
        </MDBox>
      </ContentDialog>
      <SuccessCreatedDialog
        open={openDialog}
        message={isUpdate ? 'Orden Actualizada!' : 'Orden Creada!'}
        route={'/purchase_order/view/'.concat(newId)}
      />
      <SuccessCreatedDialog
        open={openMessage}
        message={'Items creados en inventario'}
        close={closeOpenMessage}
      />
      <SnackNotification
        type='error'
        message='Ha ocurrido un error'
        closeCallback={console.log()}
        openFlag={openError}
        setOpenFlag={setOpenError}
      />
      <ContentDialog
        open={openCreate}
        title={'Items a recibir'}
        closeCallback={() => {
          setOpenCreate(false);
          setQty(0);
          setOpenQty(true);
        }}
        maxWidth='lg'
        fullWidth={true}
      >
        {openQty && (
          <MDBox p={3}>
            <MDTypography variant='h5'>
              Ingrese la cantidad a recibir
            </MDTypography>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <MDBox mb={1.5}>
                  <TextField
                    value={qty}
                    onChange={(event) => {
                      setQty(event.target.value);
                    }}
                    sx={{ width: '100%' }}
                    id='qty'
                    InputProps={{ name: 'qty', type: 'number' }}
                    label='Cantidad'
                    variant='outlined'
                  />
                </MDBox>
              </Grid>
            </Grid>
            <MDBox mt={2}>
              <MDButton
                variant='gradient'
                color='success'
                type='submit'
                onClick={() => {
                  setOpenQty(false);
                }}
              >
                Aceptar
              </MDButton>
            </MDBox>
          </MDBox>
        )}
        {!openQty && (
          <InventoryDetail
            action='add'
            inventory
            po
            poId={idToCreated}
            closeAction={closeCreate}
            qty={qty}
          />
        )}
      </ContentDialog>
      <DeleteDialog
        open={openDeleteDialog}
        message='Esta seguro de eliminar este registro?'
        successCalback={successDeleteDialog}
        cancelCallback={closeDeleteDialog}
      />
    </MDBox>
  );
};

export default CreatePurchaseOrder;
