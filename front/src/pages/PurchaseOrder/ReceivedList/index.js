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
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography"
import MDButton from "../../../components/MDButton";
import DataTable from "../../../components/DataTable"

//Utils
import {buildData} from "../../../utils/tableData"
import  { POHeaders, PODetails } from "../../../utils/tableHeaders"
import  { getReceived } from "../../../Services/POService"

import SuccessCreatedDialog from "../../../components/SuccessCreatedDialog";
import ContentDialog from "../../../components/ContentDialog";
import InventoryDetail from "../../Inventory/MainInventory/InventoryDetail";

const ReceivedList = () => {
    const [PODetail, setPODetail] = useState([])
    const [currentSecondPage, setCurrentSecondPage] = useState(1)
    const [totalSecondPages, setTotalSecondPages] = useState()
    const [secondLoading, setSecondLoading] = useState(false)
    const [received, setReceived] = useState(false)

    const handleSecondPagination = (event, value) => {
        setCurrentSecondPage(value)
        loadPODetail(value, received)
    }

    const loadPODetail = (page, receivedValue) => {
        getReceived(page, received).then(resp => {
            setPODetail(buildData(resp.data.POs_details, PODetails()))
            setCurrentSecondPage(parseInt(resp.data.current_page))
            setTotalSecondPages(resp.data.pages)
            setSecondLoading(false)
        }).catch(err => {
            console.error(err.response)
        });
    }

    useEffect(()=>{
        loadPODetail(1, received)
    }, [])

    const [idCreated, setIdCreated] = useState()
    const [idToCreated, setIdToCreated] = useState()
    const [openCreate, setOpenCreate] = useState(false)
    const [openMessage, setOpenMessage] = useState(false)

    const [qty, setQty] = useState();
    const [openQty, setOpenQty] = useState(true)

    const selectPO = (item) => {
        console.log(item)
        setIdToCreated(item.id)
        setOpenCreate(true)
    }

    const closeCreate = () => {
        setOpenCreate(false)
        setOpenMessage(true)
        setQty(0)
        setOpenQty(true)
    }

    const closeOpenMessage = ()=> {
        setIdCreated("")
        setOpenMessage(false)
        loadPODetail(1)
    }

    const editRegister = (item) => {
        console.log("edit", item)
        let route = "/purchase_order/detail/update/"
        window.location.replace(route.concat(item.purchase_order.id).concat("/".concat(item.id)))
    }

    return(
        <div>
            <Typography variant="h4" component="div">
                Pendientes de Recepcion
            </Typography>
            <MDBox my={3}>
                <Card>
                    { PODetail.rows !== undefined && PODetail.rows.length > 0 && 
                        <><DataTable useActions useAdd useEdit editAction={editRegister} addAction={selectPO} table={PODetail} showTotalEntries={false} entriesPerPage={false}
                        /> 
                        <MDBox ml={1}><Pagination sx={{ marginTop: "20px", marginBottom: "20px" }} color="info" count={totalSecondPages} page={currentSecondPage} onChange={handleSecondPagination} /> </MDBox> </>}
                    { secondLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress color="info" size={80} /></Box> }
                    { PODetail.rows !== undefined &&  PODetail.rows.length === 0 && <Typography variant="h4" component="div" sx={{ margin: "100px" }}>No Existen registros</Typography> }
                </Card>
            </MDBox>

            <SuccessCreatedDialog open={openMessage} message={ "Items creados en inventario" } close={closeOpenMessage} />
            <ContentDialog open={openCreate} title={"Items a recibir"}  closeCallback={()=>{setOpenCreate(false); setQty(0); setOpenQty(true)}} maxWidth="lg" fullWidth={true} >
                {openQty &&
                    <MDBox p={3}>
                        <MDTypography variant="h5" >Ingrese la cantidad a recibir</MDTypography>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <MDBox mb={1.5}>
                                    <TextField value={qty} onChange={(event)=>{ setQty(event.target.value) }} sx={{ width: "100%" }} id="qty" InputProps={{name: "qty", type:"number"}} label="Cantidad" variant="outlined" />
                                </MDBox>
                            </Grid>
                        </Grid>
                        <MDBox mt={2}>
                            <MDButton
                                variant="gradient"
                                color="success"
                                type="submit"
                                onClick={() => { setOpenQty(false) }}
                                >
                                    Aceptar
                            </MDButton>
                        </MDBox>
                    </MDBox>
                }
                {!openQty && 
                    <InventoryDetail action="add" inventory po poId={idToCreated} closeAction={closeCreate} qty={qty}/>
                }
                
            </ContentDialog>
        </div>
    );
}

export default ReceivedList