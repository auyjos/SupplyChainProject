import os
from flask import Flask, jsonify, request
from models.product_model import Products
from models.suppliers_model import Suppliers
from models.inventory_model import Inventory
from models.purchase_orders_model import Purchase_Orders
from models.transport_routes import Transport_Routes
from models.Relations.contains_model import Contains
from datetime import datetime
from neo4j import GraphDatabase
from dotenv import load_dotenv
from pathlib import Path
from neomodel import db
from flask_cors import CORS
from py2neo import NodeMatcher


load_dotenv()


app = Flask(__name__)
CORS(app)

uri = os.getenv('NEO4J_URI')
user = os.getenv('NEO4J_USER')
password = os.getenv('NEO4J_PASSWORD')
driver = GraphDatabase.driver(uri, auth=(user, password))


def execute_cypher_query(query, parameters={}):
    with driver.session() as session:
        result = session.run(query, parameters)
        return [record for record in result]

# GET


@app.route('/products', methods=['GET'])
def get_products():
    products = Products.nodes.all()
    return jsonify([product.__properties__ for product in products])


@app.route('/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    # Buscamos el producto por su node_id
    product = Products.nodes.get_or_none(product_id=product_id)
    if product:
        return jsonify({'product_id': product.product_id, 'name': product.name, 'type': product.type, 'stock': product.stock, 'brand': product.brand, 'description': product.description})
    else:
        return jsonify({'error': 'Product not found'}), 404


@app.route('/suppliers', methods=['GET'])
def get_suppliers():
    suppliers = Suppliers.nodes.all()
    return jsonify([suppliers.__properties__ for suppliers in suppliers])


@app.route('/supplier/<int:supplier_id>', methods=['GET'])
def get_supplier(supplier_id):
    # Buscamos el proveedor por su supplier_id
    supplier = Suppliers.nodes.get_or_none(supplier_id=supplier_id)
    if supplier:
        return jsonify({'supplier_id': supplier.supplier_id, 'name': supplier.name, 'address': supplier.address, 'phone': supplier.phone, 'country': supplier.country, 'reputation': supplier.reputation, 'contact': supplier.contact, 'email': supplier.email, 'website': supplier.website})
    else:
        return jsonify({'error': 'Supplier not found'}), 404


@app.route('/inventory', methods=['GET'])
def get_inventory():
    inventory = Inventory.nodes.all()
    return jsonify([inventory.__properties__ for inventory in inventory])


@app.route('/inventory/<int:product_id>', methods=['GET'])
def get_inventory_by_ID(product_id):
    # Buscamos el inventario por su inventory_id
    inventory = Inventory.nodes.get_or_none(product_id=product_id)
    if inventory:
        return jsonify({
            'product_id': inventory.product_id,
            'location': inventory.location,
            'quantity': inventory.quantity,
            'status': inventory.status,
            'update_date': inventory.update_date.isoformat() if inventory.update_date else None
        })
    else:
        return jsonify({'error': 'Inventory not found'}), 404


@app.route('/purchase_orders', methods=['GET'])
def get_purchase_orders():
    purchase_order = Purchase_Orders.nodes.all()
    return jsonify([purchase_order.__properties__ for purchase_order in purchase_order])


@app.route('/purchase_order/<int:order_id>', methods=['GET'])
def get_purchase_order(order_id):
    purchase_order = Purchase_Orders.nodes.get_or_none(order_id=order_id)
    if purchase_order:
        return jsonify(purchase_order.__properties__)
    else:
        return jsonify({'error': 'Purchase Order not found'}), 404


@app.route('/transport_routes', methods=['GET'])
def get_transport_routes():
    transport_routes = Transport_Routes.nodes.all()
    return jsonify([transport_route.__properties__ for transport_route in transport_routes])


@app.route('/transport_route/<int:transport_route_id>', methods=['GET'])
def get_transport_route(transport_route_id):
    transport_route = Transport_Routes.nodes.get_or_none(
        transport_route_id=transport_route_id)
    if transport_route:
        return jsonify(transport_route.__properties__)
    else:
        return jsonify({'error': 'Transport Route not found'}), 404


# POST


@app.route('/product', methods=['POST'])
def create_product():
    data = request.json
    product = Products(**data)
    product.save()
    return jsonify({'message': 'Product created successfully'}), 201


@app.route('/suppliers', methods=['POST'])
def create_supplier():
    data = request.json
    supplier = Suppliers(**data)
    supplier.save()
    return jsonify({'message': 'Product created successfully'}), 201


@app.route('/inventory', methods=['POST'])
def create_inventory():
    data = request.json
    # Convertir la cadena de texto a un objeto datetime.date
    update_date_str = data.get('update_date')
    if update_date_str:
        data['update_date'] = datetime.strptime(
            update_date_str, '%a, %d %b %Y %H:%M:%S %Z').date()
    # Crear el objeto de inventario
    inventory = Inventory(**data)
    inventory.save()
    return jsonify({'message': 'Inventory created successfully'}), 201


@app.route('/purchase_orders', methods=['POST'])
def create_purchase_order():
    data = request.json
    purchase_order = Purchase_Orders(**data)
    purchase_order.save()
    return jsonify({'message': 'Purchase Order created successfully'}), 201


@app.route('/transport_routes', methods=['POST'])
def create_transport_route():
    data = request.json
    transport_route = Transport_Routes(**data)
    transport_route.save()
    return jsonify({'message': 'Transport Route created successfully'}), 201


# Creación de relaciones
# Ruta para crear relaciones desde el frontend
def create_relationship(from_label, from_attributes, to_label, to_attributes, relationship_label, relationship_properties):
    # Construye la consulta para encontrar los nodos de inicio y fin
    match_from = f"MATCH (a:{from_label} {{"
    match_from += ", ".join(
        [f"{key}: ${'a_' + key}" for key in from_attributes.keys()])
    match_from += "})"

    match_to = f"MATCH (b:{to_label} {{"
    match_to += ", ".join([f"{key}: ${'b_' +
                          key}" for key in to_attributes.keys()])
    match_to += "})"

    # Construye la consulta para crear la relacion
    create_rel = f"CREATE (a)-[r:{relationship_label} {{"
    if relationship_properties:
        create_rel += ", ".join(
            [f"{key}: ${'r_' + key}" for key in relationship_properties.keys()])
    create_rel += "}]->(b) RETURN a, r, b"

    # Combina las partes para formar la consulta Cypher completa
    cypher_query = f"{match_from} {match_to} {create_rel}"

    return cypher_query


def exec_create_relationship(from_label, from_attributes, to_label, to_attributes, relationship_label, relationship_properties=None):
    # Genera la consulta Cypher para crear la relación
    query = create_relationship(from_label, from_attributes, to_label,
                                to_attributes, relationship_label, relationship_properties)

    # Prepara los parámetros para la consulta Cypher
    parameters = {}
    for key, value in from_attributes.items():
        parameters[f"a_{key}"] = value
    for key, value in to_attributes.items():
        parameters[f"b_{key}"] = value
    if relationship_properties:
        for key, value in relationship_properties.items():
            parameters[f"r_{key}"] = value

    # Ejecuta la consulta dentro de una sesión de Neo4j
    with driver.session() as session:
        result = session.run(query, **parameters)
        # Aquí podrías realizar alguna acción adicional con el resultado si lo deseas
        for record in result:
            print(record)


@app.route('/create_relationship', methods=['POST'])
def create_relationship_from_frontend():
    # Obtén los datos del cuerpo de la solicitud JSON
    data = request.json
    from_label = data.get('from_label')
    from_attributes = data.get('from_attributes')
    to_label = data.get('to_label')
    to_attributes = data.get('to_attributes')
    relationship_label = data.get('relationship_label')
    relationship_properties = data.get('relationship_properties')

    # Verifica que se hayan proporcionado todos los datos necesarios
    if not all([from_label, from_attributes, to_label, to_attributes, relationship_label]):
        return jsonify({'error': 'Missing required data'}), 400

    try:
        # Ejecuta la función para crear la relación
        exec_create_relationship(from_label, from_attributes, to_label,
                                 to_attributes, relationship_label, relationship_properties)
        return jsonify({'message': 'Relationship created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# PUT


@app.route('/product/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.json
    product = Products.nodes.get_or_none(product_id=product_id)
    if product:
        for key, value in data.items():
            setattr(product, key, value)
        product.save()
        return jsonify({'message': 'Product updated successfully'})
    else:
        return jsonify({'error': 'Product not found'}), 404


@app.route('/supplier/<int:supplier_id>', methods=['PUT'])
def update_supplier(supplier_id):
    data = request.json
    supplier = Suppliers.nodes.get_or_none(supplier_id=supplier_id)
    if supplier:
        for key, value in data.items():
            setattr(supplier, key, value)
        supplier.save()
        return jsonify({'message': 'Supplier updated successfully'})
    else:
        return jsonify({'error': 'Supplier not found'}), 404


@app.route('/inventory/<int:product_id>', methods=['PUT'])
def update_inventory(product_id):
    data = request.json
    inventory = Inventory.nodes.get_or_none(product_id=product_id)
    if inventory:
        for key, value in data.items():
            setattr(inventory, key, value)
        inventory.save()
        return jsonify({'message': 'Inventory updated successfully'})
    else:
        return jsonify({'error': 'Inventory not found'}), 404


@app.route('/purchase_order/<int:order_id>', methods=['PUT'])
def update_purchase_order(order_id):
    data = request.json
    purchase_order = Purchase_Orders.nodes.get_or_none(order_id=order_id)
    if purchase_order:
        for key, value in data.items():
            setattr(purchase_order, key, value)
        purchase_order.save()
        return jsonify({'message': 'Purchase Order updated successfully'})
    else:
        return jsonify({'error': 'Purchase Order not found'}), 404


@app.route('/transport_route/<int:transport_route_id>', methods=['PUT'])
def update_transport_route(transport_route_id):
    data = request.json
    transport_route = Transport_Routes.nodes.get_or_none(
        transport_route_id=transport_route_id)
    if transport_route:
        for key, value in data.items():
            setattr(transport_route, key, value)
        transport_route.save()
        return jsonify({'message': 'Transport Route updated successfully'})
    else:
        return jsonify({'error': 'Transport Route not found'}), 404


# DELETE
@app.route('/product/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Products.nodes.get_or_none(product_id=product_id)
    if product:
        product.delete()
        return jsonify({'message': 'Product deleted successfully'})
    else:
        return jsonify({'error': 'Product not found'}), 404


@app.route('/supplier/<int:supplier_id>', methods=['DELETE'])
def delete_supplier(supplier_id):
    data = request.json
    supplier = Suppliers.nodes.get_or_none(supplier_id=supplier_id)
    if supplier:
        for key, value in data.items():
            setattr(supplier, key, value)
        supplier.save()
        return jsonify({'message': 'Supplier deleted successfully'})
    else:
        return jsonify({'error': 'Supplier not found'}), 404


@app.route('/inventory/<int:product_id>', methods=['DELETE'])
def delete_inventory(product_id):
    data = request.json
    inventory = Inventory.nodes.get_or_none(product_id=product_id)
    if inventory:
        for key, value in data.items():
            setattr(inventory, key, value)
        inventory.save()
        return jsonify({'message': 'Inventory updated successfully'})
    else:
        return jsonify({'error': 'Inventory not found'}), 404


@app.route('/purchase_order/<int:order_id>', methods=['DELETE'])
def delete_purchase_order(order_id):
    purchase_order = Purchase_Orders.nodes.get_or_none(order_id=order_id)
    if purchase_order:
        purchase_order.delete()
        return jsonify({'message': 'Purchase Order deleted successfully'})
    else:
        return jsonify({'error': 'Purchase Order not found'}), 404


@app.route('/transport_route/<int:transport_route_id>', methods=['DELETE'])
def delete_transport_route(transport_route_id):
    transport_route = Transport_Routes.nodes.get_or_none(
        transport_route_id=transport_route_id)
    if transport_route:
        transport_route.delete()
        return jsonify({'message': 'Transport Route deleted successfully'})
    else:
        return jsonify({'error': 'Transport Route not found'}), 404


# Agregaciones, queries extra
# Endpoint para obtener productos con stock bajo
@app.route('/products/low-stock', methods=['GET'])
def get_products_with_low_stock():
    # Obtén el umbral de stock de la solicitud de consulta
    stock_threshold = int(request.args.get('stock_threshold', 50))

    # Realiza la consulta Cypher para obtener los productos con stock bajo
    query = """
    MATCH (p:Products)
    WHERE p.stock < $stock_threshold
    WITH p
    RETURN p.product_id as id, p.name as name, p.stock as stock
    ORDER BY p.stock DESC
    """
    result = execute_cypher_query(query, {'stock_threshold': stock_threshold})

    # Formatea los resultados en un formato JSON y devuelve la respuesta
    products = [{
        'id': record['id'],
        'name': record['name'],
        'stock': record['stock']
    } for record in result]
    return jsonify(products), 200


@app.route('/suppliers/high-reputation', methods=['GET'])
def get_suppliers_with_high_reputation():
    # Umbral de reputación alta predeterminado
    reputation_threshold = int(request.args.get('reputation_threshold', 2))
    query = """
    MATCH (s:Suppliers)
    WHERE s.reputation > $reputation_threshold
    RETURN s.supplier_id as id, s.name as name, s.reputation as reputation
    """
    result = execute_cypher_query(
        query, {'reputation_threshold': reputation_threshold})
    suppliers = [{
        'id': record['id'],
        'name': record['name'],
        'reputation': record['reputation']
    } for record in result]
    return jsonify(suppliers), 200


@app.route('/products/<product_type>', methods=['GET'])
def get_products_by_type(product_type):
    query = """
    MATCH (p:Products)
    WHERE p.type = $product_type
    RETURN p.product_id AS id, p.name AS name, p.type AS type
    """
    result = execute_cypher_query(query, {'product_type': product_type})
    products = [{
        'product_id': record['id'],
        'name': record['name'],
        'type': record['type']
    } for record in result]
    return jsonify(products), 200


@app.route('/products/types', methods=['GET'])
def get_product_types():
    query = """
    MATCH (p:Products)
    RETURN DISTINCT p.type AS type
    """
    result = execute_cypher_query(query)
    product_types = [record['type'] for record in result]
    return jsonify(product_types), 200


@app.route('/transport_routes/by_company', methods=['GET'])
def get_transport_routes_by_company():
    # Query Cypher para contar las rutas de transporte por compañía y ordenarlas de mayor a menor
    query = """
    MATCH (r:Transport_Routes)
    RETURN r.company AS company, count(r) AS route_count
    ORDER BY route_count DESC
    LIMIT 10
    """

    # Ejecuta el query Cypher y obtiene el resultado
    result = execute_cypher_query(query)

    # Procesa los resultados y construye la respuesta JSON
    transport_routes_by_company = [{
        'company': record['company'],
        'route_count': record['route_count']
    } for record in result]

    # Retorna la respuesta JSON con el código de estado 200 (OK)
    return jsonify(transport_routes_by_company), 200


if __name__ == '__main__':
    app.run(debug=True)
