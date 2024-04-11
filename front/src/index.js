import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App'

import { MaterialUIControllerProvider } from "./context";
import theme from "./assets/theme";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <MaterialUIControllerProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </MaterialUIControllerProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

