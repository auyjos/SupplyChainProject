import React, { useEffect, useState, useRef } from "react";
import { getInvoice } from '../../Services/ClientService.js';
import { Typography, Container, Paper, TextField, Button, Snackbar } from "@mui/material";
import { Table, TableBody, TableCell, TableRow, TableContainer } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select'
import { productList } from './products.js'

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const day = today.getDate().toString().padStart(2, '0'); // Add leading zero if needed

  return `${year}-${month}-${day}`;
};

const InvoiceUpdate = (props) => {

  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceDets, setInvoiceDets] = useState([]);
  const [nit, setNit] = useState();
  const [name, setName] = useState();
  const [productSelected, setProductSelected] = useState({});
  const [total, setTotal] = useState(0.00)
  const [totalActualizado, setTotalActualizado] = useState(0.00)
  const [file, setFile] = useState([]);
  const [infileDetailList, setInfileDetailList] = useState([]);

  const [formData, setFormData] = useState({
    nit: nit,
    name: name,
    date: getDate(),
    infile_detail: invoiceDets,
    total: total,
    status: "VIG",
    fel_pdf_doc: "",
  });

  

  useEffect(() => {
    setFormData({
      ...formData,
      infile_detail: invoiceDets,
      total: total,
    });

    setFormDataUpdate({
      ...formDataUpdate,
      nit: nit,
      name: name,
      infile_detail: infileDetailList,
      total: total,
    })

    // Solo realizar la carga inicial si no estás en modo de actualización
    if (props.action === 'update' || props.action === 'view'){
      getInvoice(id)
        .then((response) => {
          setInvoiceData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    
  }, [id, invoiceDets, infileDetailList.length, props.action]);


  const handleAgregarProducto = () => {
    if (productSelected) {

      const newProduct = {
        producto: productSelected.label,
        category: productSelected.category,
        descripcion: productSelected.descripcion,
        quantity: 0,
        price: productSelected.value,
      };


      setInvoiceDets([...invoiceDets, newProduct]);


      setInfileDetailList([...infileDetailList, newProduct]);
      console.log(infileDetailList)
    }
  };

  const [formDataUpdate, setFormDataUpdate] = useState({
    id: id,
    nit: nit,
    name: name,
    date: getDate(),
    infile_detail: infileDetailList,
    total: total,
    status: 'VIG',
    fel_pdf_doc: invoiceData.fel_pdf_doc,
  });


  const handleEliminarProducto = (index) => {

    const updatedInvoiceDets = [...invoiceDets];
    updatedInvoiceDets.splice(index, 1);
    setInvoiceDets(updatedInvoiceDets);


    const updatedList = [...infileDetailList];
    updatedList.splice(index, 1);
    setInfileDetailList(updatedList);
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("file:", file)
      toBase64(file)
        .then((result) => {
          console.log("file:", result)
          formData.fel_pdf_doc = result;
          setSnackbarMessage('File converted to Base64');
          setOpenSnackbar(true);
        })
        .catch((error) => {
          setSnackbarMessage('Error converting file to Base64');
          setOpenSnackbar(true);
        });
    }
  };


  


  const customStyles = {
    control: base => ({
      ...base,
      width: 400,
    }),
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');



  const handleFormChange = (event) => {

    //TODO: get File from  somewhere 

    if (file) {
      try {
        const filet = toBase64(file);
        formData.fel_pdf_doc = filet
      } catch (error) {
        console.error(error);
      }
    }




    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nit', formDataUpdate.nit);
    formData.append('name', formDataUpdate.name);
    formData.append('date', formDataUpdate.date);
    formData.append('total', formDataUpdate.total);
    formData.append('status', formDataUpdate.status);
    formData.append('fel_pdf_doc', invoiceData.fel_pdf_doc[0].file_id);
    console.log(invoiceData.fel_pdf_doc);

    formDataUpdate.infile_detail.forEach((detail, index) => {
        formData.append(`infile_detail[${index}][producto]`, detail.producto);
        formData.append(`infile_detail[${index}][descripcion]`, detail.descripcion);
        formData.append(`infile_detail[${index}][category]`, detail.category);
        formData.append(`infile_detail[${index}][quantity]`, detail.quantity);
        formData.append(`infile_detail[${index}][price]`, detail.price);
    });

    try {
        const response = await axios.post(`http://127.0.0.1:8000/invoices/${formDataUpdate.id}/update/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setSnackbarMessage(response.data.message);
        setOpenSnackbar(true);
    } catch (error) {
        setSnackbarMessage('Error updating invoice');
        setOpenSnackbar(true);
    }
};


  const crearFactura = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/invoices/create/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSnackbarMessage(response.data.message);
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  };


  const handleCantidadChange = (index, nuevaCantidad) => {
    if (nuevaCantidad >= 0) {
      const nuevosDetalles = [...invoiceDets];
      nuevosDetalles[index].quantity = nuevaCantidad;

      setInvoiceDets(nuevosDetalles);
      recalcularSubtotal(nuevosDetalles);

      const updatedList = [...infileDetailList];
      updatedList[index].quantity = nuevaCantidad;
      setInfileDetailList(updatedList);
    }
  };

  const handleCantidadChangeUpdated = (index, nuevaCantidad) => {
    if (nuevaCantidad >= 0) {

      const updatedList = [...infileDetailList];
      updatedList[index].quantity = nuevaCantidad;
      setInfileDetailList(updatedList);
      recalcularSubtotal(updatedList);
    }
  };



  const recalcularSubtotal = (detalles) => {
    const nuevoTotal = detalles.reduce((total, producto) => {
      return total + (producto.quantity || 0) * producto.price;
    }, 0);

    setTotal(parseFloat(nuevoTotal.toFixed(2)));
    console.log("nuevototal: "+ nuevoTotal)
    setTotalActualizado(nuevoTotal);
    console.log("actualizado: "+ totalActualizado)
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        {
          props.action === 'update' ?
            <>
              <Typography variant="h4" gutterBottom>
                Actualizar Factura
              </Typography>

              <form onSubmit={handleSubmit}>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <div>
                    <Typography variant="h6" align="left">
                      No. Factura: <span style={{ color: 'red' }}>{invoiceData.id}</span>
                    </Typography>

                    {/* Other input fields */}

                    <TextField
                      label="NIT"
                      name="nit"
                      value={invoiceData.nit}
                      onChange={handleFormChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Name"
                      name="name"
                      value={invoiceData.name}
                      onChange={handleFormChange}
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div>
                    <TextField
                      label="Date"
                      name="date"
                      value={getDate()}
                      onChange={handleFormChange}
                      fullWidth
                      margin="normal"
                    />
                  </div>
                </div>

                <br />
                <hr />
                <br />

                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>

                  <Select
                    options={productList}
                    styles={customStyles}
                    onChange={(e) => {
                      setProductSelected(e)
                    }}
                  />
                  <Button
                    variant="contained"
                    color="info"
                    style={{ marginLeft: '1.5vh', backgroundColor: '#1e88e5', color: 'white' }}
                    onClick={() => {
                      setInfileDetailList(invoiceData.infile_detail);
                      setTotal(invoiceData.total);
                      setName(invoiceData.name);
                      setNit(invoiceData.nit);
                    }}
                  >
                    Obtener Productos
                  </Button>

                  <Button
                    variant="contained"
                    color="info"
                    style={{ marginLeft: '1.5vh', backgroundColor: '#1e88e5', color: 'white' }}
                    onClick={() => {
                      handleAgregarProducto()
                    }}
                  >
                    Agregar Producto
                  </Button>
                </div>
                <br />

                <TableContainer>
                  <Table>
                    <thead>
                      <tr>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Producto</th>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Categoria</th>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Descripción</th>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Cantidad</th>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Precio</th>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Subtotal</th>
                        <th style={{ fontSize: "1rem", textAlign: 'left' }}>Acciones</th>
                      </tr>
                    </thead>
                    <br />
                    <TableBody>
                      {infileDetailList.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>{product.producto}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.descripcion}</TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              value={product.quantity || 0}
                              onChange={(e) => handleCantidadChangeUpdated(index, parseInt(e.target.value))}
                            />
                          </TableCell>
                          <TableCell>Q.{product.price}</TableCell>
                          <TableCell>Q.{parseFloat((product.quantity || 0) * product.price).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="error"
                              style={{ backgroundColor: '#e53935', color: 'white' }}
                              onClick={() => handleEliminarProducto(index)}
                            >
                              Eliminar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>


                <br />
                <hr />


                <Typography variant="h4" align="right">
                  Total: Q.{parseFloat(total).toFixed(2)}
                </Typography>

                <Button type="submit" variant="contained" color="secondary" style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white' }}>
                  Update Invoice
                </Button>
              </form>
            </>
            : props.action === 'view' ?
              <>
                <Typography variant="h4" gutterBottom>
                  Consulta de Factura
                </Typography>
                <br />

                <form onSubmit={handleSubmit}>

                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>

                      <Typography variant="h6" align="left">
                        No. Factura: <span style={{ color: 'red' }}>{invoiceData.id}</span>
                      </Typography>
                      <br />

                      <Typography variant="h6" align="left">
                        NIT: {invoiceData.nit}
                      </Typography>
                      <br />

                      <Typography variant="h6" align="left">
                        Nombre: {invoiceData.name}
                      </Typography>

                    </div>
                    <div>
                      <Typography variant="h6">
                        Fecha: {invoiceData.date}
                      </Typography>
                    </div>
                  </div>

                  <br />
                  <hr />
                  <br />


                  <TableContainer>
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Producto</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Categoria</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Descripción</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Cantidad</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Precio</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Subtotal</th>
                        </tr>
                      </thead>
                      <br />
                      <TableBody>
                        {
                          invoiceData.infile_detail ?
                            <>
                              {invoiceData.infile_detail.map((product, index) => (
                                <TableRow key={index}>
                                  <TableCell>{product.producto}</TableCell>
                                  <TableCell>{product.category}</TableCell>
                                  <TableCell>{product.descripcion}</TableCell>
                                  <TableCell>{product.quantity}</TableCell>
                                  <TableCell>Q.{parseFloat(product.price).toFixed(2)}</TableCell>
                                  <TableCell>Q.{parseFloat((product.quantity || 0) * product.price).toFixed(2)}</TableCell>
                                </TableRow>
                              ))}
                            </>
                            :
                            <>
                              {productList.map((product, index) => (
                                <TableRow key={index}>
                                  <TableCell>{product.label}</TableCell>
                                  <TableCell>{product.category}</TableCell>
                                  <TableCell>{product.descripcion}</TableCell>
                                  <TableCell>{product.quantity}</TableCell>
                                  <TableCell>Q.{product.value}</TableCell>
                                </TableRow>
                              ))}
                            </>
                        }



                      </TableBody>
                    </Table>
                  </TableContainer>


                  <br />
                  <hr />
                  <br />


                  <Typography variant="h3" align="right">
                    Total: Q.{parseFloat(invoiceData.total).toFixed(2)}
                  </Typography>


                </form>
              </>
              :
              <>
                <Typography variant="h4" gutterBottom>
                  Crear Factura
                </Typography>

                <form onSubmit={handleSubmit}>

                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>

                      {/* Other input fields */}
                      <TextField
                        label="Nit"
                        name="nit"
                        value={formData.nit}
                        onChange={handleFormChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        fullWidth
                        margin="normal"
                      />
                    </div>
                    <div>
                      <TextField
                        label="Date"
                        name="date"
                        value={getDate()}
                        onChange={handleFormChange}
                        fullWidth
                        margin="normal"
                      />
                      <br />
                      <br />
                      <input

                        id="file-input"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </div>

                  </div>

                  <br />
                  <hr />
                  <br />

                  <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>

                    <Select
                      options={productList}
                      styles={customStyles}
                      onChange={(e) => {
                        setProductSelected(e)
                      }}
                    />

                    <Button
                      variant="contained"
                      color="info"
                      style={{ marginLeft: '1.5vh', backgroundColor: '#1e88e5', color: 'white' }}
                      onClick={() => {
                        handleAgregarProducto()
                      }}
                    >
                      Agregar Producto
                    </Button>
                  </div>
                  <br />

                  <TableContainer>
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Producto</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Categoria</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Descripción</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Cantidad</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Precio</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Subtotal</th>
                          <th style={{ fontSize: "1rem", textAlign: 'left' }}>Acciones</th>
                        </tr>
                      </thead>
                      <br />
                      <TableBody>
                        {invoiceDets.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>{product.producto}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.descripcion}</TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                value={product.quantity || 0}
                                onChange={(e) => handleCantidadChange(index, parseInt(e.target.value))}
                              />
                            </TableCell>
                            <TableCell>Q.{product.price}</TableCell>
                            <TableCell>Q.{parseFloat((product.quantity || 0) * product.price).toFixed(2)}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="error"
                                style={{ backgroundColor: '#e53935', color: 'white' }}
                                onClick={() => handleEliminarProducto(index)}
                              >
                                Eliminar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>


                  <br />
                  <hr />


                  <Typography variant="h4" align="right">
                    Total: Q.{parseFloat(total).toFixed(2)}
                  </Typography>

                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white' }}
                    onClick={() => {
                      console.log(formData)
                      crearFactura()
                    }}
                  >
                    Crear Factura
                  </Button>
                </form>
              </>
        }


      </Paper>

      {/* Snackbar for displaying messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default InvoiceUpdate;
