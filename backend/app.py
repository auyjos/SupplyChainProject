from flask import Flask, jsonify, request
from models.product_model import Products
from models.suppliers_model import Suppliers
from models.inventory_model import Inventory
from models.purchase_orders_model import Purchase_Orders
from models.transport_routes import Transport_Routes
from models.Relations.contains_model import Contains
from datetime import datetime
app = Flask(__name__)


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


@app.route('/products', methods=['POST'])
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

    # GET: Obtener una relación Contains por su ID


if __name__ == '__main__':
    app.run(debug=True)
