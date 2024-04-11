import { useState, useEffect } from "react";

import { Divider } from "@mui/material";
import { Typography } from "@mui/material";

import {getHistory, getUSedStateLabel} from "../Services/InventoryService"
import ContentDialog from "./ContentDialog"
import MDBox from "./MDBox";

const HistoryDialog = ({openDialog, closeDialog, itemSelected}) => {

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

    useEffect(()=>{
        if(itemSelected !== undefined){
            loadHistory(1, itemSelected)
        }
    }, [itemSelected])

    return (
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
    );

}

export default HistoryDialog;