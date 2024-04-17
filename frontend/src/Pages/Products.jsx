import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavbarComponent from '../components/NavbarComponent';
function Products() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10); // Tamaño de la página
    const [formData, setFormData] = useState({
      product_id: '',
      brand: '',
      description: '',
      launch_date: '',
      name: '',
      stock: '',
      supplier: '',
      type: ''
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    useEffect(() => {
      fetchProducts();
    }, [page]); // Actualiza la lista de productos cada vez que cambia la página
  
    const fetchProducts = () => {
      fetch('http://127.0.0.1:5000/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    };
  
    const getProductById = (productId) => {
      fetch(`http://127.0.0.1:5000/product/${productId}`)
        .then(response => response.json())
        .then(data => {
          setSelectedProduct(data);
        })
        .catch(error => console.error('Error fetching product:', error));
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleGetProduct = (e) => {
      e.preventDefault();
      getProductById(formData.product_id);
    };
  
    const handleDelete = (productId) => {
      fetch(`http://127.0.0.1:5000/product/${productId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            fetchProducts();
          } else {
            console.error('Failed to delete product');
          }
        })
        .catch(error => console.error('Error deleting product:', error));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        getProductById(formData.product_id);
      };
    
    return (
      <div className="container">
        <NavbarComponent/>
        <h2>Products</h2>
        {/* Tu código existente para mostrar la lista de productos */}
        <ul>
          {products.slice((page - 1) * pageSize, page * pageSize).map(product => (
            <li key={product.id} style={{ marginBottom: '0.5rem' }}>
              <span>{product.name} - {product.brand} - {product.type}</span>
              <button
                style={{ marginLeft: '1rem' }}
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '2rem' }}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
          <span style={{ margin: '0 1rem' }}>Page {page}</span>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
  
        <h2 style={{ marginTop: '2rem' }}>Get Product by ID</h2>
        <form onSubmit={handleGetProduct}>
          <label>
            Product ID:
            <input
              type="text"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Get Product</button>
        </form>
  
        {selectedProduct && (
          <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
            <h3>Product Details</h3>
            <p>ID: {selectedProduct.id}</p>
            <p>Name: {selectedProduct.name}</p>
            <p>Brand: {selectedProduct.brand}</p>
            <p>Description: {selectedProduct.description}</p>
            {/* Agrega más detalles según sea necesario */}
          </div>
        )}
      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Add Product</h2>
      <Form.Group controlId="product_id">
          <Form.Label>Product ID</Form.Label>
          <Form.Control
            type="text"
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
          />
        </Form.Group>
      <Form onSubmit={(e) => handleSubmit(e, formData)}>
        <Form.Group className="mb-3" controlId="formBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLaunchDate">
          <Form.Label>Launch Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Select launch date"
            name="launch_date"
            value={formData.launch_date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSupplier">
          <Form.Label>Supplier</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
}

export default Products;
