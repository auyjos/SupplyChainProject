import csv
from faker import Faker
from random import randint

# Crea una instancia de Faker
faker = Faker()

# Define la ruta del archivo CSV
csv_file = 'inventory_data.csv'

# Define el rango de inventory_id que quieres generar
start_id = 50000
end_id = 50010  # Generar solo 10 registros

# Abre el archivo CSV en modo de escritura
with open(csv_file, mode='w', newline='') as file:
    writer = csv.writer(file)

    # Escribe el encabezado del archivo CSV
    writer.writerow(['inventory_id', 'location',
                    'quantity', 'status', 'update_date'])

    # Genera y escribe los datos para cada registro
    for i in range(start_id, end_id):
        writer.writerow([
            i,
            faker.address(),
            randint(1, 1000),
            faker.random_element(
                elements=('In stock', 'Out of stock', 'Active', 'Inactive')),
            faker.date_between(start_date='-1y', end_date='today')
        ])
