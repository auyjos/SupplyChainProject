import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavbarComponent  from '../components/NavbarComponent'
function CreateRelationship() {
    const [formData, setFormData] = useState({
        from_label: '',
        from_attributes: '',
        to_label: '',
        to_attributes: '',
        relationship_label: '',
        relationship_properties: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Parsear los atributos de la relación como JSON
        let relationshipProperties;
        try {
            relationshipProperties = JSON.parse(formData.relationship_properties);
        } catch (error) {
            setError('Invalid JSON format for relationship properties');
            return;
        }

        // Crear el cuerpo de la solicitud
        const requestBody = {
            from_label: formData.from_label,
            from_attributes: formData.from_attributes,
            to_label: formData.to_label,
            to_attributes: formData.to_attributes,
            relationship_label: formData.relationship_label,
            relationship_properties: relationshipProperties
        };

        // Enviar la solicitud al backend
        fetch('http://127.0.0.1:5000/create_relationship', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                setMessage('Relationship created successfully');
            } else {
                setError('Failed to create relationship');
            }
        })
        .catch(error => setError('Error creating relationship: ' + error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="container">
         <NavbarComponent/>
            <h2>Create Relationship</h2>
            <Form onSubmit={handleSubmit}>
                {/* Campos de formulario */}
                <Form.Group controlId="fromLabel">
                    <Form.Label>From Label</Form.Label>
                    <Form.Control
                        as="select"
                        name="from_label"
                        value={formData.from_label}
                        onChange={handleChange}
                    >
                        <option value="Order">Products</option>
                        <option value="Contains">Inventory</option>
                        <option value="Order">Purchase_Orders</option>
                        <option value="Order">Transport_Routes</option>
                        <option value="Order">Suppliers</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="toLabel">
                    <Form.Label>To Label</Form.Label>
                    <Form.Control
                        as="select"
                        name="to_label"
                        value={formData.to_label}
                        onChange={handleChange}
                    >
                        <option value="Order">Products</option>
                        <option value="Contains">Inventory</option>
                        <option value="Order">Purchase_Orders</option>
                        <option value="Order">Transport_Routes</option>
                        <option value="Order">Suppliers</option>
                        {/* Opciones de To Label */}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="relationshipType">
                    <Form.Label>Relationship Type</Form.Label>
                    <Form.Control
                        as="select"
                        name="relationship_label"
                        value={formData.relationship_label}
                        onChange={handleChange}
                    >
                       <option value="Order">Order</option>
                        <option value="Contains">Contains</option>
                        <option value="Order_Route">Order_Route</option>
                        <option value="Supplies">Supplies</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="relationshipAttributes">
                    <Form.Label>Relationship Attributes (JSON)</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="relationship_properties"
                        value={formData.relationship_properties}
                        onChange={handleChange}
                    />
                </Form.Group>
                {/* Otros campos de formulario para from_attributes y to_attributes */}
                <Button variant="primary" type="submit">
                    Create Relationship
                </Button>
            </Form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default CreateRelationship;
