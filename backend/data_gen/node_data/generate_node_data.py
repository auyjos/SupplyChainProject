import csv
from faker import Faker
import random

fake = Faker()

# Generar datos para productos
with open('products.csv', 'w', newline='') as csvfile:
    fieldnames = ['id', 'name', 'type', 'stock', 'brand',
                  'description', 'supplier', 'launch_date']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(1, 25000):  # 50,000 productos
        writer.writerow({
            'id': i,
            'name': fake.word(),
            'type': fake.word(),
            'stock': fake.random_int(min=0, max=1000),
            'brand': fake.company(),
            'description': fake.text(),
            # ID de proveedor ficticio
            'supplier': fake.random_int(min=1, max=100),
            'launch_date': fake.date_between(start_date='-1y', end_date='today').isoformat()
        })

# Generar datos para inventario
with open('inventory.csv', 'w', newline='') as csvfile:
    fieldnames = ['id', 'product_id', 'quantity',
                  'location', 'update_date', 'status']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(1, 25000):  # 50,000 registros de inventario
        writer.writerow({
            'id': i,
            'product_id': i,  # ID de producto ficticio
            'quantity': fake.random_int(min=0, max=1000),
            'location': fake.address(),
            'update_date': fake.date_this_decade().isoformat(),
            'status': fake.random_element(elements=("Active", "Out of stock", "In process"))
        })

# Generar datos para proveedores
with open('suppliers.csv', 'w', newline='') as csvfile:
    fieldnames = ['id', 'name', 'address', 'phone', 'country',
                  'reputation', 'contact', 'email', 'website']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(1, 101):  # 100 proveedores
        writer.writerow({
            'id': i,
            'name': fake.company(),
            'address': fake.address(),
            'phone': fake.phone_number(),
            'country': fake.country(),
            'reputation': fake.random_int(min=1, max=5),
            'contact': fake.name(),
            'email': fake.email(),
            'website': fake.url()
        })

# Generar datos para rutas de transporte
with open('transport_routes.csv', 'w', newline='') as csvfile:
    fieldnames = ['id', 'origin', 'destination',
                  'cost', 'estimated_time', 'company']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(1, 25000):  # 50,000 rutas de transporte
        writer.writerow({
            'id': i,
            'origin': fake.city(),
            'destination': fake.city(),
            'cost': fake.random_int(min=10, max=1000),
            'estimated_time': fake.time(pattern="%H:%M:%S", end_datetime=None),
            'company': fake.company()
        })

# Generar datos para ordenes de compra
with open('purchase_orders.csv', 'w', newline='') as csvfile:
    fieldnames = ['id', 'date', 'total', 'status',
                  'payment_method', 'products', 'delivered']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(1, 1001):  # 1,000 órdenes de compra
        # Obtener 5 IDs de productos únicos
        products = random.sample(range(1, 50001), k=5)
        writer.writerow({
            'id': i,
            'date': fake.date_this_year().isoformat(),
            'total': fake.random_int(min=10, max=1000),
            'status': fake.random_element(elements=("Processing", "Shipped", "Delivered")),
            'payment_method': fake.random_element(elements=("Credit Card", "PayPal", "Cash")),
            'products': ','.join(map(str, products)),
            'delivered': fake.boolean(chance_of_getting_true=50)
        })
