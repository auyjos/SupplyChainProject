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

// Material Dashboard 2 PRO React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography"
import MDButton from "../../../components/MDButton";
import DataTable from "../../../components/DataTable"

import OptionsDialog from "../../../components/OptionsDialog";
import ContentDialog from "../../../components/ContentDialog";

//Utils
import {buildData} from "../../../utils/tableData"
import {inventoryMainHeaders, inventorySecondHeaders} from "../../../utils/tableHeaders"
import { getPieces, getUniquePieces, deleteItem, sendToScrap, sendToQuarantine, getUSedStateLabel, getHistory, exportInventory } from '../../../Services/InventoryService';
import { saveAs } from 'file-saver';

const MainInventory = () => {

    const [uniquePieces, setUniquePieces] = useState([])
    const [currentMainPage, setCurrentMainPage] = useState(1);
    const [totalMainPages, setTotalMainPages] = useState();
    const [mainLoading, setMainLoading] = useState(true);

    const [idSelected, setIdSelected] = useState()
    const [pieces, setPieces] = useState([])
    const [currentSecondPage, setCurrentSecondPage] = useState(1);
    const [totalSecondPages, setTotalSecondPages] = useState();
    const [secondLoading, setSecondLoading] = useState(false);

    //Pagination
    const handleMainPagination = (event, value) => {
        setCurrentMainPage(value)
        loadUniquePieces(value,filter, valueFilter)
    };

    const handleSecondPagination = (event, value) => {
        setCurrentSecondPage(value)
        loadPieces(value, idSelected)
    }

    const loadUniquePieces = (page,filter, value) => {
        getUniquePieces(page,filter, value).then(resp => {
            // console.log(buildData(resp.data.data, inventoryMainHeaders()))
            setUniquePieces(buildData(resp.data.inventory, inventoryMainHeaders()))
            setCurrentMainPage(parseInt(resp.data.current_page))
            setTotalMainPages(resp.data.pages)
            setMainLoading(false)
        }).catch(err => {
            console.error(err.response)
        })
    }

    const loadPieces = (page, partId) => {
        getPieces(page, partId).then(resp => {
            console.log(resp)
            // console.log(buildData(resp.data.inventory, inventorySecondHeaders()))
            setPieces(buildData(resp.data.inventory_detail, inventorySecondHeaders()))
            setCurrentSecondPage(parseInt(resp.data.current_page))
            setTotalSecondPages(resp.data.pages)
            setSecondLoading(false)
        }).catch(err => {
            console.error(err.response)
        })
    }

    useEffect(() => {
        loadUniquePieces(1)
        // loadPieces(1, "a")
    }, []);

    const selectUniquePiece = (value) => {
        // console.log(value)
        setSecondLoading(true)
        setIdSelected(value.id)
        loadPieces(1, value.id)
    }

    //Actions
    const deleteRegister = (item) => {
        console.log(item)
        setItemToDelete(item)
        setOpenDelete(true);
    };
    const editRegister = (item) => {
        console.log("edit", item)
        window.location.replace("/inventory/main/update/".concat(item.id))
    }
    const viewRegister = (item) => {
        console.log("view", item)
        window.location.replace("/inventory/main/view/".concat(item.id))
    }
    const editPiece = (item => {
        window.location.replace("/inventory/detail/update/".concat(item.id))
    })
    const viewPiece = (item => {
        window.location.replace("/inventory/detail/view/".concat(item.id))
    })

    //Delete
    const [openDelete, setOpenDelete] = useState(false);
    const [itemToDelete, setItemToDelete] = useState();
    const closeDeleteDialog = () => {
        setOpenDelete(false);
    };
    const successDeleteDialog = (value) => {
        if(itemToDelete.id !== null && itemToDelete.id !== undefined){
            let promise;
            switch (Number(value)) {
                case 1:
                    promise = deleteItem(itemToDelete.id)
                    break;
                case 2:
                    promise = sendToScrap(itemToDelete.id)
                    break;
                case 3:
                    promise = sendToQuarantine(itemToDelete.id)
                    break;
                default:
                    break;
            }
            promise.then(resp => {
                loadPieces(currentSecondPage, idSelected)
            }).catch(err => {
                console.error(err.response)
            });
        }
        console.log(value)
        setOpenDelete(false);
    }

    const options = [
        { title: "Eliminar", id: 1 },
        {title: "Desechar", id: 2},
        {title: "Enviar a Cuarentena", id:3 }
    ]

    // Menu and Filters
    const [filter, setFilter] = useState();
    const [filterLabel, setFilterLabel] = useState("Filtros");
    const [valueFilter, setValueFilter] = useState();

    const filters = [
        {label:"Part Number", value:"part_id"},
        {label:"Description", value:"description"},
        {label:"Model",value:"model"},
        {label:"Tipe", value:"type"},
        {label:"Min", value:"min_amount"},
        {label:"Max", value:"max_amount"},
        {label:"Location", value:"location"},
        {label:"Tariff", value:"tariff_code"},
        {label:"Weight", value:"weight"},
        {label:"Amount", value:"amount"},
        {label:"Market Price", value:"market_price"},
        {label:"List Price", value:"list_price"},
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
        loadUniquePieces(1, filter, value)
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
        loadUniquePieces(1)
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

      //History
    const [openDialog, setOpenDialog] = useState(false);
    const [history, setHistory] = useState([]);
    const [currentPageH, setCurrentPageH] = useState(1);
    const [totalPagesH, setTotalPagesH] = useState();
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
    const viewAction = (item) => {
        console.log(item)
        loadHistory(1, item.id)
        setOpenDialog(true)
    }

    const closeDialog = () => {
        setOpenDialog(false)
    }

    const exportCSV = () => {
        exportInventory().then(({data}) => {
            let blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
            saveAs(blob, "Inventario.csv");
        });
    };

    return(
        <div>
            <Typography variant="h4" component="div">
                Inventario
            </Typography>

            <MDBox my={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Link to="/inventory/main/add">
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
                        <MDButton variant="outlined" color="dark" onClick={exportCSV}>
                            <Icon>description</Icon>
                            &nbsp;export csv
                        </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
                <Card>
                    { uniquePieces.rows !== undefined && uniquePieces.rows.length > 0 && 
                        <><DataTable useActions useView useEdit selectAction={selectUniquePiece} useSelect={true} table={uniquePieces} showTotalEntries={false} entriesPerPage={false}
                        editAction={editRegister} viewAction={viewRegister} handleSearch={handleSearch} canSearch/> 
                        <MDBox ml={1}><Pagination sx={{ marginTop: "20px", marginBottom: "20px" }} color="info" count={totalMainPages} page={currentMainPage} onChange={handleMainPagination} /> </MDBox> </>}  
                    { mainLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress color="info" size={80} /></Box> }
                    { uniquePieces.rows !== undefined &&  uniquePieces.rows.length === 0 && <Typography variant="h4" component="div" sx={{ margin: "100px" }}>No Existen registros</Typography> }
                </Card>
            </MDBox>
            {  pieces.rows !== undefined && pieces.rows.length > 0 &&
                (
                    <Divider >Seleccionados por Part Number</Divider>
                )
            }
            <MDBox my={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    { idSelected &&
                        <Link to={"/inventory/detail/add/".concat(idSelected)}>
                            <MDButton variant="gradient" color="info">
                                Agregar 
                            </MDButton>
                        </Link>
                    }
                    {/* <MDBox display="flex">
                        <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
                        Filtros&nbsp;
                        <Icon>keyboard_arrow_down</Icon>
                        </MDButton>
                        {renderMenu}
                        <MDBox ml={1}>
                        <MDButton variant="outlined" color="dark">
                            <Icon>description</Icon>
                            &nbsp;export csv
                        </MDButton>
                        </MDBox>
                    </MDBox> */}
                </MDBox>
                <Card>
                    { pieces.rows !== undefined && pieces.rows.length > 0 && 
                        <><DataTable useActions useView useEdit useDelete useTime table={pieces} showTotalEntries={false} entriesPerPage={false} 
                        editAction={editPiece}  deleteAction={deleteRegister} viewAction={viewPiece} timeAction={viewAction}/> 
                        <MDBox ml={1}><Pagination sx={{ marginTop: "20px", marginBottom: "20px" }} color="info" count={totalSecondPages} page={currentSecondPage} onChange={handleSecondPagination} /> </MDBox> </>}  
                    { secondLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress color="info" size={80} /></Box> }
                    { pieces.rows !== undefined &&  pieces.rows.length === 0 && <Typography variant="h4" component="div" sx={{ margin: "100px" }}>No Existen registros</Typography> }
                </Card>
            </MDBox>

            <OptionsDialog open={openDelete} title={"Que desea hacer con este item?"} successCalback={successDeleteDialog} cancelCallback={closeDeleteDialog} options={options} />

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

export default MainInventory;