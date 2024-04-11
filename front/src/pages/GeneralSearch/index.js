import React, {useState} from "react";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import ComplexStatisticsCard from '../../components/cards/ComplexStatisticsCard'
import MDBox from "../../components/MDBox";
import FormField from "../../components/FormField";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import DataTable from "../../components/DataTable";
import OptionsDialog from "../../components/OptionsDialog";
import HistoryDialog from "../../components/HistoryDialog";

import ContentDialog from "../../components/ContentDialog"
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Autocomplete } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Pagination from '@mui/material/Pagination';

import {getItems, deleteItem, sendToScrap, sendToQuarantine,} from "../../Services/InventoryService"
//Utils
import {buildData} from "../../utils/tableData"
import {inventoryMainHeaders, inventorySecondHeaders, inventoryQuarantineHeaders} from "../../utils/tableHeaders"

const GeneralSearch = () => {

    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [filter, setFilter] = useState("");
    const [filterLabel, setFilterLabel] = useState("")
    const [filterValue, setFilterValue] = useState();

    const loadItems = (page, filter, value) => {
        getItems(page, filter,value).then(resp => {
            console.log(resp.data)
            setItems(buildData(resp.data.inventory_detail, inventoryQuarantineHeaders()))
            setTotalPages(parseInt(resp.data.current_page))
            setTotalPages(resp.data.pages)
            setLoading(false)
            setOpenDialog(false)
        }).catch(err => {
            console.error(err.response)
        })
    }

    const onChangeFilter = (event) => {
        console.log(event.target.value)
        setFilterValue(event.target.value)
    }

    const filterOptions = [
        {label: "Supplier", value: "supplier__Company"},
        {label: "Part Number", value: "inventory__part_id"},
        {label: "Registration", value: "register"}
    ]

    const onClickFilterButton = (value) =>{
        setFilter(filterOptions[value].value)
        setFilterLabel(filterOptions[value].label)
        setOpenDialog(true)
    }

    const onSearch = () =>{
        setLoading(true)
        console.log("buscando", filter, filterValue)
        loadItems(1, filter, filterValue)
    }

    const closeDialog = () => {
        setOpenDialog(false)
    }

    const handelPagination = (event, value) => {
        setCurrentPage(value)
        loadItems(value, filter, filterValue)
    }

    //Actions
    const deleteRegister = (item) => {
        console.log(item)
        setItemToDelete(item)
        setOpenDelete(true);
    };
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
                loadItems(currentPage, filter, filterValue)
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
            <Grid container item xs={10} spacing={6} direction="row" justifyContent="center" alignItems="center" alignContent="center">
                <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5} onClick={()=>{onClickFilterButton(0)}}>
                        <ComplexStatisticsCard
                            color="info"
                            icon="weekend"
                            title="By Supplier"
                            count=""
                            percentage={{
                                color: "success",
                                amount: "+55%",
                                label: "than lask week",
                            }}
                        />
                    </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5} onClick={()=>{onClickFilterButton(1)}}>
                        <ComplexStatisticsCard
                            color="info"
                            icon="weekend"
                            title="By Part Number"
                            count=""
                            percentage={{
                                color: "success",
                                amount: "+55%",
                                label: "than lask week",
                            }}
                        />
                    </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5} onClick={()=>{onClickFilterButton(2)}} >
                        <ComplexStatisticsCard
                            color="info"
                            icon="weekend"
                            title="By Registration"
                            count=""
                            percentage={{
                                color: "success",
                                amount: "+55%",
                                label: "than lask week",
                            }}
                        />
                    </MDBox>
                </Grid>

                

            </Grid>

            <MDBox my={3}>
                    <Card>
                        { items.rows !== undefined && items.rows.length > 0 && 
                            <><DataTable useActions useView useEdit useDelete  useTime table={items} showTotalEntries={false} entriesPerPage={false} 
                            editAction={editPiece}  deleteAction={deleteRegister} viewAction={viewPiece} timeAction={timeAction}/> 
                            <MDBox ml={1}><Pagination sx={{ marginTop: "20px", marginBottom: "20px" }} color="info" count={totalPages} page={currentPage} onChange={handelPagination} /> </MDBox> </>}  
                        { loading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress color="info" size={80} /></Box> }
                        { items.rows !== undefined &&  items.rows.length === 0 && <Typography variant="h4" component="div" sx={{ margin: "100px" }}>No Existen registros</Typography> }
                    </Card>
                </MDBox>

            <ContentDialog open={openDialog} title={"Busqueda por ".concat(filterLabel || "")}  closeCallback={closeDialog}  >
                <Card>
                    <MDBox p={2}>
                        <MDBox mt={2}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <MDInput onChange={onChangeFilter}sx={{ width: "20rem", marginBottom: "2rem" }} />
                                    <MDButton variant="gradient" color="success" onClick={onSearch}>
                                        Buscar
                                    </MDButton>
                                </Grid>
                            </Grid>
                        </MDBox>
                    </MDBox>
                </Card>
            </ContentDialog>

            <OptionsDialog open={openDelete} title={"Que desea hacer con este item?"} successCalback={successDeleteDialog} cancelCallback={closeDeleteDialog} options={options} />
            <HistoryDialog openDialog={openHistory} closeDialog={closeHistory} itemSelected={itemHistory} ></HistoryDialog>

        </div>
    );
}

export default GeneralSearch;