import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ClientList.css';

//Utils
import { exportClient, getInvoices } from '../../../Services/ClientService';
import { buildData } from '../../../utils/tableData';
import { invoiceHeaders } from '../../../utils/tableHeaders';

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

import { deleteClient, anularFactura } from '../../../Services/ClientService';
import { saveAs } from 'file-saver';

const ClientsList = (sts) => {
  const [factura, setFactura] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [invoiceToDelete, setInvoiceToDelete] = useState();
  const [openDeteleDialog, setOpenDeleteDialog] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setFactura({})
    setLoading(true)
    loadClients(currentPage);
  }, [sts]);

  const loadClients = (page, filter, value) => {
    console.log(sts)
    getInvoices(page, filter, value, sts.sts)
      .then((resp) => {
        setFactura(buildData(resp.data.invoices, invoiceHeaders()));
        setCurrentPage(parseInt(resp.data.current_page));
        setTotalPages(resp.data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  //Actions
  const deleteRegister = (client) => {
    setInvoiceToDelete(client);
    setOpenDeleteDialog(true);
  };

  const anular = (invoice) => {
    setInvoiceToDelete(invoice);
    setOpenDeleteDialog(true);
  };

  const editRegister = (client) => {
    navigate(`/invoices/update/${client.id}`);
  };
  const viewRegister = (client) => {
    navigate(`/invoices/view/${client.id}`);
  };

  //Calbacks to Delete dialog
  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const successDeleteDialog = () => {
    deleteClient(invoiceToDelete.id)
      .then((resp) => {
        loadClients(currentPage, filter, valueFilter);
      })
      .catch((err) => {
        console.error(err);
      });
    setOpenDeleteDialog(false);
  };

  const successAnulationDialog = () => {
    anularFactura(invoiceToDelete.id)
      .then((resp) => {
        loadClients(currentPage, filter, valueFilter);
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
    { label: 'Nombre', value: 'name' },
    { label: 'Direccion', value: 'address' },
    { label: 'Ciudad', value: 'city' },
    { label: 'Zip Code', value: 'zip_code' },
    { label: 'Estado', value: 'state' },
    { label: 'Pais', value: 'country' },
    { label: 'Tax', value: 'tax_id' },
    { label: 'Telefono', value: 'phone' },
    { label: 'Correo', value: 'email' },
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
    loadClients(1, filter, value);
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
    loadClients(1);
    closeMenu();
  };

  //Pagination
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    loadClients(value, filter, valueFilter);
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

  const exportCSV = () => {
    exportClient().then(({ data }) => {
      let blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'factura.csv');
    });
  };

  return (
    <div className='client-list-container'>
      <Typography variant='h4' component='div'>
        {
          sts.sts === 'VIG' ?
            <>
              Facturas Vigentes
            </>
            :
            <>
              Facturas Anuladas
            </>
        }

      </Typography>

      <MDBox my={3}>
        <MDBox
          display='flex'
          justifyContent='space-between'
          alignItems='flex-start'
          mb={2}
        >
          {
            sts.sts === 'VIG' ?
              <Link to='/invoice/create/'>
                <MDButton variant='gradient' color='info'>
                  Agregar Factura
                </MDButton>
              </Link>
              :
              <></>
          }
          
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
          </MDBox>
        </MDBox>
        <Card>
          {factura.rows !== undefined && factura.rows.length > 0 && (
            <>
              {
                sts.sts === 'VIG' ?
                  <DataTable
                    handleSearch={handleSearch}
                    useActions
                    useView
                    useEdit
                    useDelete
                    editAction={editRegister}
                    deleteAction={anular}
                    viewAction={viewRegister}
                    table={factura}
                    showTotalEntries={false}
                    entriesPerPage={false}
                    canSearch
                  />
                  :
                  <DataTable
                    handleSearch={handleSearch}
                    useActions
                    useView
                    useDelete
                    editAction={editRegister}
                    deleteAction={deleteRegister}
                    viewAction={viewRegister}
                    table={factura}
                    showTotalEntries={false}
                    entriesPerPage={false}
                    canSearch
                  />
              }

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
          {factura.rows !== undefined && factura.rows.length === 0 && (
            <Typography variant='h4' component='div' sx={{ margin: '100px' }}>
              No Existen registros
            </Typography>
          )}
        </Card>
      </MDBox>
      {/* <Link to="/menu" style={{ alignSelf: "start" }} >
                <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                    <MDButton variant="gradient" color="error" sx={{ height: "100%" }}>
                        Regresar
                    </MDButton>
                </MDBox>
            </Link> */}

      <DeleteDialog
        open={openDeteleDialog}
        nameToDelete={invoiceToDelete != null ? invoiceToDelete.id : ''}
        successCalback={sts.sts === 'VIG' ? successAnulationDialog : successDeleteDialog}
        cancelCallback={closeDeleteDialog}
      />
    </div>
  );
};

export default ClientsList;
