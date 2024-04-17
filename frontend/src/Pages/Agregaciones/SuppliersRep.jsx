import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import NavbarComponent from '../../components/NavbarComponent';
function SuppliersRep() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/suppliers/high-reputation');
      if (!response.ok) {
        throw new Error('Failed to fetch suppliers');
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      setError('Error fetching suppliers: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
        <NavbarComponent />
      <h2>Suppliers with High Reputation {'>'}2</h2>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="row">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="col-md-4 mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{supplier.name}</Card.Title>
                <Card.Text>
                  Reputation: {supplier.reputation}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuppliersRep;
