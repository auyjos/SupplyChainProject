import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '../../components/DataTable';
import { Typography } from '@mui/material';

function Aggregation03() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/invoices/average_price_per_category/');
            const formattedData = response.data.map(item => ({
                ...item,
                average_price: parseFloat(item.average_price).toFixed(2)
            }));
            setData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Precio Promedio por Categoría
            </Typography>
            <DataTable
                table={{
                    columns: [
                        { Header: "Categoría", accessor: "category", width: "50%" },
                        { Header: "Precio Promedio", accessor: "average_price" },
                    ],
                    rows: data
                }}
            />
        </div>
    );
}

export default Aggregation03;
