import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '../../components/DataTable';
import { Typography } from '@mui/material';

function Aggregation02() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/invoices/top_customers_by_total_spent/');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Top de Clientes por Total Gastado
            </Typography>
            <DataTable
                table={{
                    columns: [
                        { Header: "Nombre", accessor: "_id", width: "50%" },
                        { Header: "Total Gastado", accessor: "total_spent" },
                    ],
                    rows: data
                }}
            />
        </div>
    );
}

export default Aggregation02;
