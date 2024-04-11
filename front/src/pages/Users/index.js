import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { TextField } from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography"
import MDButton from "../../components/MDButton";
import DataTable from "../../components/DataTable"
import SnackNotification from "../../components/SnackNotification";

//Utils
import {buildData} from "../../utils/tableData"
import {userHeaders} from "../../utils/tableHeaders"
import { getItems, getHistory, getUSedStateLabel } from '../../Services/InventoryService'
import { signUp, getAllUsers } from '../../Services/authService'

import ContentDialog from "../../components/ContentDialog"

const Users = () => {
    const [openCreate, setopenCreate] = useState(false)
    const [inputs, setInputs] = useState({});
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const [users, setUsers] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(true);

    const handleChange = (event, type) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value})) ;
    }

    const closeModals = () => {
        setopenCreate(false)
        setInputs({})
    }

    const createUser = () => {
        console.log(inputs)
        signUp(inputs).then(resp => {
            console.log(resp.data)
            setOpenSuccess(true)
            closeModals()
        }).catch(err => {
            console.error(err.response);
            setOpenError(true)
        });
    }

    const loadUsers = (page, filter, value) => {
        getAllUsers(page, filter, value).then(resp => {
            console.log(buildData(resp.data.users, userHeaders()))
            setUsers(buildData(resp.data.users, userHeaders()));
            setCurrentPage(parseInt(resp.data.current_page))
            setTotalPages(resp.data.pages);
            setLoading(false)
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        })
    }

    //Pagination
    const handleChangePage = (event, value) => {
        setCurrentPage(value)
        loadUsers(value, filter, valueFilter)
    };

    useEffect(()=>{
        loadUsers(1)
    }, [])

    // Menu and Filters
    const [filter, setFilter] = useState();
    const [filterLabel, setFilterLabel] = useState("Filtros");
    const [valueFilter, setValueFilter] = useState();

    const filters = [
        {label:"No.", value:"id"},
        {label:"Nombre", value:"name"},
        {label:"Email", value:"email"},
    ]

    const getFilterLabel = (value) => {
        let label;
        filters.forEach(option => {
            if(option.value === value){
                label = option.label;
            }
        })
        return label;
    }

    const handleSearch = (value) => {
        console.log("search", value)
        setValueFilter(value);
        loadUsers(1, filter, value)
    }

    const [menu, setMenu] = useState(null);
    const openMenu = (event) => setMenu(event.currentTarget);
    const closeMenu = () => {
        setMenu(null)
    };
    const handleChangeFilter = (value) => {
        setFilter(value);
        setFilterLabel(getFilterLabel(value))
        setMenu(null)
        closeMenu()

    };
    const clearFilter = () => {
        setMenu(null);
        setFilter()
        setFilterLabel("Filtros")
        loadUsers(1)
        closeMenu()
    }

    const renderMenu = (
        <Menu
          anchorEl={menu}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={Boolean(menu)}
          onClose={closeMenu}
          keepMounted
        >
            {
                filters.map((option)=>(
                    <MenuItem key={option.value} onClick={()=> handleChangeFilter(option.value)} value={option.value} >{option.label}</MenuItem>
                ))
            }
          {/* <MenuItem onClick={()=> handleChange('nombre')} value="nombre" >Nombre</MenuItem>
          <MenuItem onClick={()=> handleChange('correo')} value="correo" >Correo</MenuItem> */}
          <Divider sx={{ margin: "0.5rem 0" }} />
          <MenuItem onClick={clearFilter}>
            <MDTypography variant="button" color="error" fontWeight="regular">
              Eliminar filtro
            </MDTypography>
          </MenuItem>
        </Menu>
      );
    
  return (
    <div>
        <Typography variant="h4" component="div">
                Usuarios
        </Typography>
        <MDBox my={3}>
            <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <MDButton variant="gradient" color="info" onClick={()=>{setopenCreate(true)}} >
                    Agregar Usuario
                </MDButton>
                <MDBox display="flex">
                    <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
                    { filterLabel }&nbsp;
                    <Icon>keyboard_arrow_down</Icon>
                    </MDButton>
                    {renderMenu}
                    <MDBox ml={1}>
                    <MDButton variant="outlined" color="dark">
                        <Icon>description</Icon>
                        &nbsp;export csv
                    </MDButton>
                    </MDBox>
                </MDBox>
            </MDBox>
            <Card>
                        { users.rows !== undefined && users.rows.length > 0 && (<><DataTable handleSearch={handleSearch} 
                         table={users} showTotalEntries={false} entriesPerPage={false} canSearch />
                        <MDBox ml={1}><Pagination sx={{ marginTop: "20px", marginBottom: "20px" }} color="info" count={totalPages} page={currentPage} onChange={handleChangePage} /> </MDBox> </>) }  
                        { loading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress color="info" size={80} /></Box> }
                        { users.rows !== undefined &&  users.rows.length === 0 && <Typography variant="h4" component="div" sx={{ margin: "100px" }}>No Existen registros</Typography> }
                    </Card>
        </MDBox>

        <ContentDialog open={openCreate} title={"New User"}  closeCallback={closeModals} maxWidth="md" fullWidth={true} >
                    <MDBox p={3}>
                        <Grid container spacing={3}>
                            
                            <Grid item xs={12} md={6}>
                                <MDBox mb={1.5}>
                                    <TextField value={inputs.email || ""} onChange={handleChange} sx={{ width: "100%" }} id="date" InputProps={{name: "email", type:"email"}} label="Email" variant="outlined" />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDBox mb={1.5}>
                                    <TextField value={inputs.name || ""} onChange={handleChange} sx={{ width: "100%" }} id="name" InputProps={{name: "name"}} label="Name" variant="outlined" />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MDBox mb={1.5}>
                                    <TextField value={inputs.password || ""} onChange={handleChange} sx={{ width: "100%" }} id="password" InputProps={{name: "password", type:"password"}} label="Password" variant="outlined" />
                                </MDBox>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <MDBox mb={1.5}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                    <Select
                                    labelId="role-label"
                                    id="role"
                                    value={inputs.role}
                                    label="Role"
                                    name="role"
                                    onChange={handleChange}
                                    sx={{ height: "40px" }}
                                    >
                                        <MenuItem value="A">Admin</MenuItem>
                                        <MenuItem value="U">Supervisor</MenuItem>
                                        <MenuItem value="I">Inventario</MenuItem>
                                        <MenuItem value="N">Naves</MenuItem>
                                    </Select>
                                </FormControl>
                                </MDBox>
                            </Grid>

                        </Grid>
                    </MDBox>
                    <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
                        <MDBox mt={2}>
                            <MDButton
                                variant="gradient"
                                color="success"
                                type="submit"
                                onClick={createUser}
                                >
                                    Aceptar
                            </MDButton>
                        </MDBox>
                    </MDBox>
            </ContentDialog>
            <SnackNotification  type="error" message="Ha ocurrido un error" closeCallback={console.log()} openFlag={openError} setOpenFlag={setOpenError} />
            <SnackNotification  type="success" message="Usuario creado" closeCallback={console.log()} openFlag={openSuccess} setOpenFlag={setOpenSuccess} />
    </div>
  )
}

export default Users