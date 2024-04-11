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

import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography"
import MDButton from "../../components/MDButton";
import DataTable from "../../components/DataTable"

import OptionsDialog from "../../components/OptionsDialog";
import ContentDialog from "../../components/ContentDialog";

import DeleteDialog from "../../components/DeleteDialog";

//Utils
import {buildData} from "../../utils/tableData"
import  { POHeaders, PODetails } from "../../utils/tableHeaders"
import  { getPO, getPODetail, deletePO, changeLockPO } from "../../Services/POService"

const PurchaseOrder = () => {
    const [POData, setPOData] = useState([])
    const [currentMainPage, setCurrentMainPage] = useState(1);
    const [totalMainPages, setTotalMainPages] = useState();
    const [mainLoading, setMainLoading] = useState(true);

    const [idSelected, setIdSelected] = useState()
    const [PODetail, setPODetail] = useState([])
    const [currentSecondPage, setCurrentSecondPage] = useState(1)
    const [totalSecondPages, setTotalSecondPages] = useState()
    const [secondLoading, setSecondLoading] = useState(false)

    //Pagination
    const handleMainPagination = (event, value) => {
        setCurrentMainPage(value)
        loadPOData(value,filter, valueFilter)
    };

    const handleSecondPagination = (event, value) => {
        setCurrentSecondPage(value)
        loadPODetail(value, idSelected)
    }

    const loadPOData = (page,filter, value) => {
        getPO(page,filter, value).then( resp => {
            console.log(resp.data.POs)
            console.log(buildData(resp.data.POs, POHeaders()))
            setPOData(buildData(resp.data.POs, POHeaders()))
            setCurrentMainPage(parseInt(resp.data.current_page))
            setTotalMainPages(resp.data.pages)
            setMainLoading(false)
        }
        ).catch(err => {
            console.error(err.response)
        });
    }

    const loadPODetail = (page, POId) => {
        getPODetail(page, POId).then(resp => {
            setPODetail(buildData(resp.data.POs_details, PODetails()))
            setCurrentSecondPage(parseInt(resp.data.current_page))
            setTotalSecondPages(resp.data.pages)
            setSecondLoading(false)
        }).catch(err => {
            console.error(err.response)
        });
    }

    const selectElement = (value) => {
        setSecondLoading(true)
        setIdSelected(value.id)
        loadPODetail(1, value.id)
    }

    useEffect(()=>{
        loadPOData(1)
    }, [])

    const [registerToDetele, setRegisterToDelete] = useState()
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const deleteRegister = (register) => {
        setRegisterToDelete(register)
        setOpenDeleteDialog(true);
    }

    //Calbacks to Delete dialog
    const closeDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };
    const successDeleteDialog = () => {
        deletePO(registerToDetele.id).then((resp) => {
            loadPOData(currentMainPage, filter, valueFilter)
        }).catch((err) => {
            console.error(err)
        });
        setOpenDeleteDialog(false);
    }

    const changeLock = (register) => {
        changeLockPO(register.id, !register.locked).then((resp) => {
            loadPOData(currentMainPage, filter, valueFilter)
        }).catch((err) => {
            console.error(err)
        });
    }

    // Menu and Filters
    const [filter, setFilter] = useState();
    const [filterLabel, setFilterLabel] = useState("Filtros");
    const [valueFilter, setValueFilter] = useState();

    const filters = [
        {label:"Addressed To", value:"addressedTo"},
        {label:"Order From", value:"orderFrom"},
        {label:"Ship To",value:"shipTo"},
        {label:"Bill To", value:"billTo"},
        {label:"Reference", value:"your_reference"},
        {label:"Ship Via", value:"ship_via"},
        {label:"PBH", value:"pbh_contract"},
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
        loadPOData(1, filter, value)
    }

    const [menu, setMenu] = useState(null);
    const openMenu = (event) => setMenu(event.currentTarget);
    const closeMenu = () => {
        setMenu(null)
    };
    const handleChange = (value) => {
        setFilter(value);
        setFilterLabel(getFilterLabel(value))
        setMenu(null)
        closeMenu()

    };
    const clearFilter = () => {
        setMenu(null);
        setFilter()
        setFilterLabel("Filtros")
        loadPOData(1)
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
                    <MenuItem key={option.label} onClick={()=> handleChange(option.value)} value={option.value} >{option.label}</MenuItem>
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

    const editRegister = (item) => {
        console.log("edit", item)
        window.location.replace("/purchase_order/update/".concat(item.id))
    }
    const viewRegister = (item) => {
        console.log("view", item)
        window.location.replace("/purchase_order/view/".concat(item.id))
    }
    
    return(
        <div>
            <Typography variant="h4" component="div">
                Purchase Order
            </Typography>
            <MDBox my={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Link to="/purchase_order/create">
                        <MDButton variant="gradient" color="info">
                            Agregar 
                        </MDButton>
                    </Link>
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
                    { POData.rows !== undefined && POData.rows.length > 0 && 
                        <><DataTable useActions useView useFile  useSelect useDelete useEdit useLock table={POData} showTotalEntries={false} entriesPerPage={false}
                         selectAction={selectElement} viewAction={viewRegister} editAction={editRegister} deleteAction={deleteRegister} lockAction={changeLock} handleSearch={handleSearch} canSearch/> 
                        <MDBox ml={1}><Pagination sx={{ marginTop: "20px", marginBottom: "20px" }} color="info" count={totalMainPages} page={currentMainPage} onChange={handleMainPagination} /> </MDBox> </>}  
                    { mainLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress color="info" size={80} /></Box> }
                    { POData.rows !== undefined &&  POData.rows.length === 0 && <Typography variant="h4" component="div" sx={{ margin: "100px" }}>No Existen registros</Typography> }
                </Card>
            </MDBox>
            {  PODetail.rows !== undefined && PODetail.rows.length > 0 &&
                (
                    <Divider >Seleccionados</Divider>
                )
            }
            <MDBox my={3}>
                <Card>
                    { PODetail.rows !== undefined && PODetail.rows.length > 0 && 
                        <><DataTable table={PODetail} showTotalEntries={false} entriesPerPage={false} 
                        /> 
                        <MDBox ml={1}><Pagination sx={{ marginTop: "20px", marginBottom: "20px" }} color="info" count={totalSecondPages} page={currentSecondPage} onChange={handleSecondPagination} /> </MDBox> </>}  
                    { secondLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress color="info" size={80} /></Box> }
                    { PODetail.rows !== undefined &&  PODetail.rows.length === 0 && <Typography variant="h4" component="div" sx={{ margin: "100px" }}>No Existen registros</Typography> }
                </Card>
            </MDBox>

            <DeleteDialog  open={openDeleteDialog} message="Esta seguro de eliminar este registro?" successCalback={successDeleteDialog} cancelCallback={closeDeleteDialog} />
        </div>
    );

}

export default PurchaseOrder;