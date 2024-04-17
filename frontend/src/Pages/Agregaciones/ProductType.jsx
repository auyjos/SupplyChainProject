import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import NavbarComponent from '../../components/NavbarComponent';

function ProductType() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/products/types');
      if (!response.ok) {
        throw new Error('Failed to fetch product types');
      }
      const data = await response.json();
      setTypes(data);
    } catch (error) {
      setError('Error fetching product types: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
       < NavbarComponent />
      <h2>Product Types</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ListGroup>
        {types.map((type, index) => (
          <ListGroup.Item key={index}>{type}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default ProductType;
