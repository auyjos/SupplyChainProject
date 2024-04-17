import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import NavbarComponent from '../components/NavbarComponent';

function DeleteProduct() {
    const [productId, setProductId] = useState('');
    const [isProductDeleted, setIsProductDeleted] = useState(false);

    const handleDelete = () => {
        fetch(`http://127.0.0.1:5000/product/${productId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setIsProductDeleted(true);
            } else {
                console.error('Failed to delete product');
            }
        })
        .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div className="container">
            <NavbarComponent/>
            <h2>Delete Product by ID</h2>
            <label>
                Product ID:
                <input
                    type="text"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                />
            </label>
            <Button onClick={handleDelete}>Delete Product</Button>
            {isProductDeleted && (
                <div style={{ marginTop: '1rem', color: 'green' }}>
                    Product deleted successfully!
                </div>
            )}
        </div>
    );
}

export default DeleteProduct;
