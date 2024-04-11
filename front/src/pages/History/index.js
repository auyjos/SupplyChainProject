
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
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography"
import MDButton from "../../components/MDButton";
import DataTable from "../../components/DataTable"

//Utils
import {buildData} from "../../utils/tableData"
import {inventoryItems} from "../../utils/tableHeaders"
import { getItems, getHistory, getUSedStateLabel } from '../../Services/InventoryService'

import ContentDialog from "../../components/ContentDialog"

const History = () => {

    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(true);

    const [openDialog, setOpenDialog] = useState(false);
    const [history, setHistory] = useState([]);
    const [currentPageH, setCurrentPageH] = useState(1);
    const [totalPagesH, setTotalPagesH] = useState();

    //Pagination
    const handlePagination = (event, value) => {
        setCurrentPage(value)
        loadItems(value, filter, valueFilter)
    };

    const loadItems = (page, filter, valueFilter) => {
        getItems(page, filter, valueFilter).then(resp => {
            console.log(resp.data)
            setItems(buildData(resp.data.inventory_detail,inventoryItems()))
            setCurrentPage(parseInt(resp.data.current_page))
            setTotalPages(resp.data.pages)
            setLoading(false)
        }).catch(err => {
            console.error(err.response)
        });
    }

    const getDate = (date) => {
        let d = new Date(date)
        return d.toUTCString()
    }

    const formatHistory = (history) => {
        let historyList = [];
        history.forEach((item) => {
            historyList.push(
                {
                    from: getUSedStateLabel(item.old_state) ,
                    to: getUSedStateLabel(item.new_state) ,
                    date: getDate(item.updated_at)
                }
            )
        })
        console.log(historyList)
        return historyList;
    }

    const loadHistory = (page, item) => {
        getHistory(page, item).then(resp => {
            setHistory(formatHistory(resp.data.history));
            setCurrentPageH(parseInt(resp.data.current_page))
            setTotalPagesH(resp.data.pages)
        })
    }

    useEffect(() => {
        loadItems(1)
    }, [])

    const viewAction = (item) => {
        console.log(item)
        loadHistory(1, item.id)
        setOpenDialog(true)
    }

    const closeDialog = () => {
        setOpenDialog(false)
    }

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

    return(
        <div>
            <Typography variant="h4" component="div">
                Historial
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
                        <><DataTable useActions  useView viewAction={viewAction}  table={items} showTotalEntries={false} entriesPerPage={false} handleSearch={handleSearch} canSearch/> 
                        <MDBox ml={1}><Pagination sx={{ marginTop: "20px", marginBottom: "20px" }} color="info" count={totalPages} page={currentPage} onChange={handlePagination} /> </MDBox> </>}  
                    { loading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress color="info" size={80} /></Box> }
                    { items.rows !== undefined &&  items.rows.length === 0 && <Typography variant="h4" component="div" sx={{ margin: "100px" }} >No Existen registros</Typography> }
                </Card>
            </MDBox>

            <ContentDialog open={openDialog} title={"Historial del item "}  closeCallback={closeDialog}  >
                <MDBox p={3} >
                    { history.length > 0 &&
                        history.map(h => (
                            <MDBox key={h.date}>
                                <p>
                                    Estado anterior: {h.from}
                                </p>
                                <p>
                                    Nuevo Estado: {h.to}
                                </p>
                                <p>
                                    Fecha: {h.date}
                                </p>
                                <Divider sx={{ margin: "0.5rem 0" }} />
                            </MDBox>
                        ))
                    }
                    {
                        history.length === 0 && 
                        <Typography variant="h4" component="div" sx={{ margin: "100px" }} >No Existen registros</Typography>
                    }
                </MDBox>
            </ContentDialog>

        </div>
    );
}

export default History;