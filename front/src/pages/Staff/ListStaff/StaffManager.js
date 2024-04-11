import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import {
    getStaffList,
    deleteStaff
} from '../../../Services/StaffService';

import {
  shipsHeaders,
  staffHeaders,
  shipPartsHeaders,
  shipMotorHeaders,
  shipAircraftsHeaders,
} from '../../../utils/tableHeaders';
import { buildData } from '../../../utils/tableData';

import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { Typography, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import MDTypography from '../../../components/MDTypography';
import MDButton from '../../../components/MDButton';
import MDBox from '../../../components/MDBox';
import DataTable from '../../../components/DataTable';
import DeleteDialog from '../../../components/DeleteDialog';
import ContentDialog from '../../../components/ContentDialog';
import SnackNotification from '../../../components/SnackNotification';

const StaffManager = () => {

    const navigate = useNavigate();

  // Ships states
  const [ships, setShips] = useState([]);
  const [currentShipPage, setCurrentShipPage] = useState(1);
  const [totalShipPages, setTotalShipPages] = useState();
  const [selectedShipId, setSelectedShipId] = useState(null);
  const [loadingShips, setLoadingShips] = useState(true);

  // Staff states
  const [staff, setStaff] = useState([]);
  const [currentStaffPage, setCurrentStaffPage] = useState(1);
  const [totalStaffPages, setTotalStaffPages] = useState();
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [loadingStaff, setLoadingStaff] = useState(true);

  const [staffToDelete, setStaffToDelete] = useState();
  const [openDeteleDialog, setOpenDeleteDialog] = React.useState(false);

  const [openCreate, setopenCreate] = useState(false);
  const [inputs, setInputs] = useState({});
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [action, setAction] = useState();

  const loadStaff = async () => {
    try {
      const { data } = await getStaffList();
      setStaff(buildData(data.staff, staffHeaders()));
      setCurrentStaffPage(parseInt(data.current_page));
      setTotalStaffPages(data.pages);
      setLoadingStaff(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStaff(false);
    }
  };


  // Menu and Filters
  const [filter, setFilter] = useState();
  const [filterLabel, setFilterLabel] = useState('Filtros');
  const [valueFilter, setValueFilter] = useState();

  const filters = [
    { label: 'No.', value: 'id' },
    { label: 'Registro', value: 'register' },
    { label: 'Model', value: 'model' },
    { label: 'Serial', value: 'serial_number' },
  ];

  const getFilterLabel = (value) => {
    let label;
    filters.forEach((option) => {
      if (option.value === value) {
        label = option.label;
      }
    });
    return label;
  };

  const handleSearch = (value) => {
    setValueFilter(value);
    loadStaff(1, filter, value);
  };

  const [menu, setMenu] = useState(null);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => {
    setMenu(null);
  };
  const handleChangeFilter = (value) => {
    setFilter(value);
    setFilterLabel(getFilterLabel(value));
    setMenu(null);
    closeMenu();
  };
  const clearFilter = () => {
    setMenu(null);
    setFilter();
    setFilterLabel('Filtros');
    loadStaff(1);
    closeMenu();
  };

  //Pagination Ships
  const handleChangePageShips = (event, value) => {
    setCurrentShipPage(value);
    loadStaff(value, filter, valueFilter);
  };

 

  // const handleSecondPagination = (event, value) => {
  //     setCurrentSecondPage(value)
  //     loadShipParts(value, idSelected)
  // }

  const deleteRegister = (ship) => {
    setStaffToDelete(ship);
    setOpenDeleteDialog(true);
    setAction('deleteStaff');
  };
  const editRegister = (ship) => {
    navigate(`/staff/update/${ship.id}`);
  };
 

  //Calbacks to Delete dialog
  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const successDeleteDialog = () => {
    if (action === 'deleteStaff') {
      deleteStaff(staffToDelete.id)
        .then((resp) => {
          setStaffToDelete();
          loadStaff(currentShipPage, filter, valueFilter);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // else if(action === 'deletePart'){
    //     deleteStaffPart(partToDelete.id)
    //     .then((resp) => {
    //         setPartToDelete()
    //         loadShipParts(currentSecondPage, idSelected);
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     });
    // }

    setOpenDeleteDialog(false);
  };

  const handleChange = (event, type) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const closeModals = () => {
    setopenCreate(false);
    setInputs({});
  };

  const viewPart = (value) => {
    console.log(value);
    setopenCreate(true);
    
    setAction('view');
  };

  const updateStaff = (value) => {
    setopenCreate(true);
    
    setAction('update');
  };



  useEffect(() => {
    loadStaff(1);
  }, []);



  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      {filters.map((option) => (
        <MenuItem
          key={option.value}
          onClick={() => handleChangeFilter(option.value)}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
      {/* <MenuItem onClick={()=> handleChange('nombre')} value="nombre" >Nombre</MenuItem>
          <MenuItem onClick={()=> handleChange('correo')} value="correo" >Correo</MenuItem> */}
      <Divider sx={{ margin: '0.5rem 0' }} />
      <MenuItem onClick={clearFilter}>
        <MDTypography variant='button' color='error' fontWeight='regular'>
          Eliminar filtro
        </MDTypography>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      {/* Staff Manager*/}
      <Typography variant='h4' component='div'>
        Staff Manager
      </Typography>

      <MDBox my={3}>
        <MDBox
          display='flex'
          justifyContent='space-between'
          alignItems='flex-start'
          mb={2}
        >
          <Link to='/staff/create'>
            <MDButton variant='gradient' color='info'>
              Agregar
            </MDButton>
          </Link>
         {/* <MDBox display='flex'>
            <MDButton
              variant={menu ? 'contained' : 'outlined'}
              color='dark'
              onClick={openMenu}
            >
              {filterLabel}&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenu}
            <MDBox ml={1}>
              <MDButton variant='outlined' color='dark'>
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
  </MDBox>*/}
  </MDBox>
        <Card>
          {staff.rows !== undefined && staff.rows.length > 0 && (
            <>
              <DataTable
                handleSearch={handleSearch}
                useActions
                useEdit
                useDelete
                editAction={editRegister}
                deleteAction={deleteRegister}
                table={staff}
                showTotalEntries={false}
                entriesPerPage={false}
                canSearch
              />
              <MDBox ml={1}>
                <Pagination
                  sx={{ marginTop: '20px', marginBottom: '20px' }}
                  color='info'
                  count={totalStaffPages}
                  page={currentStaffPage}
                  onChange={handleChangePageShips}
                />{' '}
              </MDBox>{' '}
            </>
          )}
          {loadingStaff && (
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
          {staff.rows !== undefined && staff.rows.length === 0 && (
            <Typography variant='h4' component='div' sx={{ margin: '100px' }}>
              No Existen registros
            </Typography>
          )}
        </Card>
      </MDBox>

      <MDBox my={3}>
        <MDBox
          display='flex'
          justifyContent='space-between'
          alignItems='flex-start'
          mb={2}
        >
        
        </MDBox>
        
      </MDBox>

      <ContentDialog
        open={openCreate}
        title={'Part'}
        closeCallback={closeModals}
        maxWidth='md'
        fullWidth={true}
      >
        <MDBox p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MDBox mb={1.5}>
                <TextField
                  value={inputs.inventory_detail || ''}
                  onChange={handleChange}
                  sx={{ width: '100%' }}
                  id='inventory_detail'
                  InputProps={{
                    name: 'inventory_detail',
                    disabled: action === 'view',
                  }}
                  label='Item'
                  variant='outlined'
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={1.5}>
                <TextField
                  value={inputs.instalation_date || ''}
                  onChange={handleChange}
                  sx={{ width: '100%' }}
                  id='instalation_date'
                  InputProps={{
                    name: 'instalation_date',
                    type: 'date',
                    disabled: action === 'view',
                  }}
                  label='instalation date'
                  variant='outlined'
                  focused
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={1.5}>
                <TextField
                  value={inputs.link || ''}
                  onChange={handleChange}
                  sx={{ width: '100%' }}
                  id='link'
                  InputProps={{ name: 'link', disabled: action === 'view' }}
                  label='link'
                  variant='outlined'
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={1.5}>
                <TextField
                  value={inputs.next_date || ''}
                  onChange={handleChange}
                  sx={{ width: '100%' }}
                  id='next_date'
                  InputProps={{
                    name: 'next_date',
                    type: 'date',
                    disabled: action === 'view',
                  }}
                  label='next date'
                  variant='outlined'
                  focused
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
                    <MDBox mt={2}>
                        <MDButton
                            variant="gradient"
                            color="success"
                            type="submit"
                            onClick={createPart}
                            disabled={action === 'view'}
                            >
                                Aceptar
                        </MDButton>
                    </MDBox>
                </MDBox> */}
      </ContentDialog>

      <DeleteDialog
        open={openDeteleDialog}
        message='Esta seguro de eliminar este registro?'
        successCalback={successDeleteDialog}
        cancelCallback={closeDeleteDialog}
      />
      <SnackNotification
        type='error'
        message='Ha ocurrido un error'
        closeCallback={console.log()}
        openFlag={openError}
        setOpenFlag={setOpenError}
      />
      <SnackNotification
        type='success'
        message='Parte creado'
        closeCallback={console.log()}
        openFlag={openSuccess}
        setOpenFlag={setOpenSuccess}
      />
    </div>
  );
};

export default StaffManager;
