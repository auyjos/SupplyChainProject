import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SuppliersList.css';

//Utils
import {
  getSuppliers,
  deleteSupplier,
  exportSupliers,
} from '../../../Services/SupplierService';
import { buildData } from '../../../utils/tableData';
import { supplierHeaders } from '../../../utils/tableHeaders';

//Custom Components
import DeleteDialog from '../../../components/DeleteDialog';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

// Material Dashboard 2 PRO React components
import MDBox from '../../../components/MDBox';
import MDTypography from '../../../components/MDTypography';
import MDButton from '../../../components/MDButton';
import DataTable from '../../../components/DataTable';
import { saveAs } from 'file-saver';

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [objToDelete, setObjToDelete] = useState();
  const [openDeteleDialog, setOpenDeleteDialog] = React.useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSuppliers(1);
  }, []);

  const loadSuppliers = (page, filter, value) => {
    getSuppliers(page, filter, value)
      .then((resp) => {
        setSuppliers(buildData(resp.data, supplierHeaders()));
        setCurrentPage(parseInt(resp.data.current_page));
        setTotalPages(resp.data.pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  //Actions
  const deleteRegister = (supplier) => {
    setObjToDelete(supplier);
    setOpenDeleteDialog(true);
  };
  const editRegister = (supplier) => {
    window.location.replace('/suppliers/update/'.concat(supplier.id));
  };
  const viewRegister = (supplier) => {
    window.location.replace('/suppliers/view/'.concat(supplier.id));
  };

  //Calbacks to Delete dialog
  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const successDeleteDialog = () => {
    deleteSupplier(objToDelete.id)
      .then((resp) => {
        loadSuppliers(currentPage, filter, valueFilter);
      })
      .catch((err) => {
        console.error(err);
      });
    setOpenDeleteDialog(false);
  };

  // Menu and Filters
  const [filter, setFilter] = useState();
  const [filterLabel, setFilterLabel] = useState('Filtros');
  const [valueFilter, setValueFilter] = useState();

  const filters = [
    { label: 'No.', value: 'id' },
    { label: 'Compañia', value: 'Company' },
    { label: 'Direccion', value: 'address' },
    { label: 'Ciudad', value: 'city' },
    { label: 'Zip Code', value: 'zip_code' },
    { label: 'Estado', value: 'state' },
    { label: 'Telefono', value: 'phone' },
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
    console.log('search', value);
    setValueFilter(value);
    loadSuppliers(1, filter, value);
  };

  const [menu, setMenu] = useState(null);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => {
    setMenu(null);
  };
  const handleChange = (value) => {
    setFilter(value);
    setFilterLabel(getFilterLabel(value));
    setMenu(null);
    closeMenu();
  };
  const clearFilter = () => {
    setMenu(null);
    setFilter();
    setFilterLabel('Filtros');
    loadSuppliers(1);
    closeMenu();
  };

  //Pagination
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    loadSuppliers(value);
  };

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
          onClick={() => handleChange(option.value)}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
      <Divider sx={{ margin: '0.5rem 0' }} />
      <MenuItem onClick={clearFilter}>
        <MDTypography variant='button' color='error' fontWeight='regular'>
          Eliminar filtro
        </MDTypography>
      </MenuItem>
    </Menu>
  );

  const exportCSV = () => {
    exportSupliers().then(({ data }) => {
      let blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'Suppliers.csv');
    });
  };

  return (
    <div className='client-list-container'>
      <Typography variant='h4' component='div'>
        Proveedores
      </Typography>

      <MDBox my={3}>
        <MDBox
          display='flex'
          justifyContent='space-between'
          alignItems='flex-start'
          mb={2}
        >
          <Link to='/suppliers/add'>
            <MDButton variant='gradient' color='info'>
              Agregar Proveedor
            </MDButton>
          </Link>
          <MDBox display='flex'>
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
              <MDButton variant='outlined' color='dark' onClick={exportCSV}>
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <Card>
          {suppliers.rows !== undefined && suppliers.rows.length > 0 && (
            <>
              <DataTable
                filter={filter}
                handleSearch={handleSearch}
                useActions
                useView
                useEdit
                useDelete
                editAction={editRegister}
                deleteAction={deleteRegister}
                viewAction={viewRegister}
                table={suppliers}
                showTotalEntries={false}
                entriesPerPage={false}
                canSearch
              />
              <MDBox ml={1}>
                <Pagination
                  sx={{ marginTop: '20px', marginBottom: '20px' }}
                  color='info'
                  count={totalPages}
                  page={currentPage}
                  onChange={handleChangePage}
                />{' '}
              </MDBox>{' '}
            </>
          )}
          {loading && (
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
          {suppliers.rows !== undefined && suppliers.rows.length === 0 && (
            <Typography variant='h4' component='div' sx={{ margin: '100px' }}>
              No Existen registros
            </Typography>
          )}
        </Card>
      </MDBox>
      <Link to='/menu' style={{ alignSelf: 'start' }}>
        <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
          <MDButton variant='gradient' color='error' sx={{ height: '100%' }}>
            Regresar
          </MDButton>
        </MDBox>
      </Link>

      <DeleteDialog
        open={openDeteleDialog}
        nameToDelete={objToDelete != null ? objToDelete.Company : ''}
        successCalback={successDeleteDialog}
        cancelCallback={closeDeleteDialog}
      />
    </div>
  );
};

export default SuppliersList;
