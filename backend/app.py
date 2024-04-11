from flask import Flask, jsonify, request
from models.product_model import Products


app = Flask(__name__)


@app.route('/products', methods=['GET'])
def get_products():
    products = Products.nodes.all()
    return jsonify([product.__properties__ for product in products])

# Ruta para crear un nuevo producto


@app.route('/products', methods=['POST'])
def create_product():
    data = request.json
    product = Products(**data)
    product.save()
    return jsonify({'message': 'Product created successfully'}), 201
# Ruta para obtener un producto por su ID


@app.route('/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    # Buscamos el producto por su node_id
    product = Products.nodes.get_or_none(product_id=product_id)
    if product:
        return jsonify({'product_id': product.product_id, 'name': product.name, 'type': product.type, 'stock': product.stock, 'brand': product.brand, 'description': product.description})
    else:
        return jsonify({'error': 'Product not found'}), 404


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
# Ruta para eliminar un producto por su ID


@app.route('/product/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Products.nodes.get_or_none(product_id=product_id)
    if product:
        product.delete()
        return jsonify({'message': 'Product deleted successfully'})
    else:
        return jsonify({'error': 'Product not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)
