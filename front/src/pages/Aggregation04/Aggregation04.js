import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '../../components/DataTable';
import { Typography } from '@mui/material';

function Aggregation04() {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Electronicos');

    useEffect(() => {
        if (selectedCategory) {
            fetchData(selectedCategory);
        }
    }, [selectedCategory]);

    const fetchData = async (category) => {
        try {
            const response = await axios.get(`http://localhost:8000/invoices/units_sold_from_category/?category=${category}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Unidades Vendidas por Categoría
            </Typography>
            <div>
                <label htmlFor="category">Seleccionar Categoría:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange} style={{ fontSize: '16px', marginLeft: '10px', padding: '2px' }}>
                    <option value="Electronicos">Electronicos</option>
                    <option value="Computo">Computo</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Estudio">Estudio</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
            {selectedCategory && (
                <DataTable
                    table={{
                        columns: [
                            { Header: "Categoría", accessor: "category", width: "50%" },
                            { Header: "Unidades Vendidas", accessor: "units_sold" },
                        ],
                        rows: data
                    }}
                />
            )}
        </div>
    );
}

export default Aggregation04;
