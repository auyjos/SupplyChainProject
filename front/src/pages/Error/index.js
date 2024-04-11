import React from 'react'
import { Link } from 'react-router-dom';

import MDButton from '../../components/MDButton';

import Typography from '@mui/material/Typography';

const Error = () => {
  return (
    <div>
        <Typography variant="h1" component="div" gutterBottom>
            Acceso No Permitido
        </Typography>
        <Link to="/menu" style={{ alignSelf: "start" }} >
            <MDButton variant="gradient" color="error" sx={{ height: "100%" }}>
                Regresar el menu
            </MDButton>
        </Link>
    </div>
  )
}

export default Error;