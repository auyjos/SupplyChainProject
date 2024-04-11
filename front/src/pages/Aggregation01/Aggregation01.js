import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '../../components/DataTable';
import { Typography } from '@mui/material';

function Aggregation01() {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('2023'); // Default selected year

    useEffect(() => {
        fetchData(selectedYear);
    }, [selectedYear]);

    const fetchData = async (year) => {
        try {
            const response = await axios.get(`http://localhost:8000/invoices/monthly_sales_of_year/?year=${year}`);
            const formattedData = response.data.map(item => ({
                ...item,
                sales: parseFloat(item.sales)
            }));
            setData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Ventas Mensuales por Año
            </Typography>
            <div>
                <label htmlFor="year">Seleccionar Año:</label>
                <select id="year" value={selectedYear} onChange={handleYearChange} style={{ fontSize: '16px', marginLeft: '10px', padding: '2px' }}>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    {/* Add more years as needed */}
                </select>
            </div>
            {data.length > 0 ? (
                <DataTable
                    table={{
                        columns: [
                            { Header: "año", accessor: "year", width: "25%" },
                            { Header: "mes", accessor: "month", width: "30%" },
                            { Header: "ventas", accessor: "sales" },
                        ],
                        rows: data
                    }}
                />
            ) : (
                <Typography variant="body1">No hay datos disponibles para el año seleccionado.</Typography>
            )}
        </div>
    );
    
}

export default Aggregation01;
