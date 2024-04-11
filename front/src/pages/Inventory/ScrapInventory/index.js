
import React, {useEffect, useState} from "react";

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

// Material Dashboard 2 PRO React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography"
import MDButton from "../../../components/MDButton";
import DataTable from "../../../components/DataTable"
import HistoryDialog from "../../../components/HistoryDialog"

//Utils
import {buildData} from "../../../utils/tableData"
import {inventoryScrapHeaders} from "../../../utils/tableHeaders"
import { getScrap ,sendToInventory} from '../../../Services/InventoryService'

//Custom Components
import DeleteDialog from "../../../components/DeleteDialog";

const ScrapInventory = () => {

    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(true);

    //Pagination
    const handlePagination = (event, value) => {
        setCurrentPage(value)
        loadItems(value, filter, valueFilter)
    };

    const loadItems = (page, filter, valueFilter) => {
        getScrap(page, filter, valueFilter).then(resp => {
            console.log(resp.data)
            setItems(buildData(resp.data.inventory_detail,inventoryScrapHeaders()))
            setCurrentPage(parseInt(resp.data.current_page))
            setTotalPages(resp.data.pages)
            setLoading(false)
        }).catch(err => {
            console.error(err.response)
        });
    }

    useEffect(() => {
        loadItems(1)
    }, [])

    // Menu and Filters
    const [filter, setFilter] = useState();
    const [filterLabel, setFilterLabel] = useState("Filtros");
    const [valueFilter, setValueFilter] = useState();

    const filters = [
        {label:"Part Number", value:"inventory__part_id"},
        {label:"Descripcion", value:"inventory__description"},
        {label:"Traking",value:"tracker_id"},
        {label:"Serial", value:"serial_number"},
        {label:"Tipo", value:"type"},
        {label:"QTY", value:"qty"},
        {label:"Cost", value:"cost"},
        {label:"Freight", value:"freight"},
        {label:"Retail", value:"retail"},
        {label:"Location", value:"location"},
        {label:"Condition", value:"condition"},
        {label:"Base", value:"base"},
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
        loadItems(1, filter, value)
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
        loadItems(1)
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

    const [itemToDelete, setItemToDelete] = useState();
    const [openDeteleDialog, setOpenDeleteDialog] = React.useState(false);
    const deleteRegister = (client) => {
        setItemToDelete(client)
        setOpenDeleteDialog(true);
    };
    const closeDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };
    const successDeleteDialog = () => {
        sendToInventory(itemToDelete.id).then((resp) => {
            loadItems(1)
        }).catch((err) => {
            console.error(err)
        });
        setOpenDeleteDialog(false);
    }
    //History
    const [openHistory, setOpenHistory] = useState(false);
    const [itemHistory, setItemHistory] = useState();
    const timeAction = (item) => {
        setOpenHistory(true)
        setItemHistory(item.id)
    }

    const closeHistory = () => {
        setOpenHistory(false)
    }
    return(
        <div>
            <Typography variant="h4" component="div">
                Contenedor de Desechos
            </Typography>

            <MDBox my={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    {/* <Link to="/suppliers/add">
                        <MDButton variant="gradient" color="info">
                            Agregar Proveedor
                        </MDButton>
                    </Link> */}
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
                    { items.rows !== undefined && items.rows.length > 0 && 
                        <><DataTable  useActions useDelete useTime deleteAction={deleteRegister}  deleteMessage="Regresar a Inventario"  table={items} showTotalEntries={false} entriesPerPage={false} handleSearch={handleSearch} 
                        canSearch timeAction={timeAction}/> 
                        <MDBox ml={1}><Pagination sx={{ marginTop: "20px", marginBottom: "20px" }} color="info" count={totalPages} page={currentPage} onChange={handlePagination} /> </MDBox> </>}  
                    { loading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress color="info" size={80} /></Box> }
                    { items.rows !== undefined &&  items.rows.length === 0 && <Typography variant="h4" component="div" sx={{ margin: "100px" }} >No Existen registros</Typography> }
                </Card>
            </MDBox>

            <DeleteDialog  open={openDeteleDialog} message="Esta seguro de querer regrese al inventario este item?" successCalback={successDeleteDialog} cancelCallback={closeDeleteDialog} />
            <HistoryDialog openDialog={openHistory} closeDialog={closeHistory} itemSelected={itemHistory} ></HistoryDialog>

        </div>
    );
}

export default ScrapInventory;