from faker import Faker
import csv
import random

# Crear una instancia de Faker
fake = Faker()

# Función para generar datos ficticios de detalles de una orden


def generate_order_details(num_records):
    # Lista para almacenar los registros generados
    order_details = []

    # Generar datos ficticios para cada registro
    for _ in range(num_records):
        order_id = fake.unique.random_number(digits=5)  # ID de la orden
        product_name = fake.random_element(
            ["Product A", "Product B", "Product C"])  # Nombre del producto
        quantity = fake.random_number(digits=2)  # Cantidad del producto
        # Precio unitario del producto
        price = round(random.uniform(10.0, 100.0), 2)
        total = round(quantity * price, 2)  # Precio total del producto

        # Agregar el registro a la lista de detalles de orden
        order_details.append({
            'order_id': order_id,
            'product_name': product_name,
            'quantity': quantity,
            'price': price,
            'total': total
        })

    return order_details

# Función para escribir los datos ficticios en un archivo CSV


def write_order_details_to_csv(order_details, file_path):
    # Definir las columnas del archivo CSV
    fieldnames = ['order_id', 'product_name', 'quantity', 'price', 'total']

    # Escribir los datos en el archivo CSV
    with open(file_path, mode='w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for order_detail in order_details:
            writer.writerow(order_detail)


# Generar 100 registros de detalles de orden
num_records = 10
order_details = generate_order_details(num_records)

# Escribir los detalles de la orden en un archivo CSV
write_order_details_to_csv(order_details, 'order_details.csv')

print("Datos generados y guardados exitosamente en 'order_details.csv'")
