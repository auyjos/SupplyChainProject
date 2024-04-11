import csv
from faker import Faker
import random

fake = Faker()

# Generar datos para la relación entre Inventory y PurchaseOrders
with open('inventory_purchase_orders.csv', 'w', newline='') as csvfile:
    fieldnames = ['inventory_id', 'purchase_order_id',
                  'cantidad', 'precio_unitario', 'subtotal']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(1000):  # Generar 1000 filas de datos
        writer.writerow({
            'inventory_id': fake.random_int(min=1, max=50000),
            'purchase_order_id': fake.random_int(min=1, max=50000),
            'cantidad': fake.random_int(min=1, max=100),
            'precio_unitario': fake.random_int(min=1, max=1000),
            'subtotal': fake.random_int(min=10, max=10000)
        })

# Generar datos para la relación entre PurchaseOrders y Productos
with open('purchase_orders_products.csv', 'w', newline='') as csvfile:
    fieldnames = ['purchase_order_id', 'product_id',
                  'cantidad', 'precio_unitario', 'descuento']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(1000):  # Generar 1000 filas de datos
        writer.writerow({
            'purchase_order_id': fake.random_int(min=1, max=50000),
            'product_id': fake.random_int(min=1, max=50000),
            'cantidad': fake.random_int(min=1, max=100),
            'precio_unitario': fake.random_int(min=1, max=1000),
            # Generar descuento aleatorio
            'descuento': random.choice([0, 0.1, 0.2, 0.3, 0.4])
        })

# Generar datos para la relación entre Productos y Proveedores
with open('products_suppliers.csv', 'w', newline='') as csvfile:
    fieldnames = ['product_id', 'supplier_id',
                  'fecha_inicio', 'fecha_fin', 'cantidad']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(1000):  # Generar 1000 filas de datos
        writer.writerow({
            'product_id': fake.random_int(min=1, max=50000),
            'supplier_id': fake.random_int(min=1, max=50000),
            'fecha_inicio': fake.date_this_year().isoformat(),
            'fecha_fin': fake.date_between(start_date='today', end_date='+1y').isoformat(),
            'cantidad': fake.random_int(min=1, max=100)
        })

# Generar datos para la relación entre Proveedores e Inventario
with open('suppliers_inventory.csv', 'w', newline='') as csvfile:
    fieldnames = ['supplier_id', 'inventory_id', 'precio_unitario', 'en_stock']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(1000):  # Generar 1000 filas de datos
        writer.writerow({
            'supplier_id': fake.random_int(min=1, max=50000),
            'inventory_id': fake.random_int(min=1, max=50000),
            'precio_unitario': fake.random_int(min=1, max=1000),
            'en_stock': fake.boolean()
        })
# Generar datos para la relación entre Productos y Rutas de Transporte
with open('products_transport_routes.csv', 'w', newline='') as csvfile:
    fieldnames = ['product_id', 'transport_route_id']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(1000):  # Generar 1000 filas de datos
        writer.writerow({
            'product_id': fake.random_int(min=1, max=50000),
            'transport_route_id': fake.random_int(min=1, max=50000)
        })
