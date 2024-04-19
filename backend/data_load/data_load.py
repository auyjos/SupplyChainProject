from neo4j import GraphDatabase
import csv

uri = "neo4j+s://27489c7e.databases.neo4j.io:7687"
user = "neo4j"
password = "uPw1SolGY1Db1l65qYVPj9KN9JuFPtNxOs5SD9-r22s"
driver = GraphDatabase.driver(uri, auth=(user, password))


def create_product_purchase_relationships_from_csv(file_path):
    # Abre el archivo CSV y crea una sesión Neo4j
    with open(file_path, newline='') as csvfile, driver.session() as session:
        reader = csv.DictReader(csvfile)
        # Itera sobre las filas del archivo CSV y crea relaciones en la base de datos
        for row in reader:
            quantity = int(row['quantity'])  # Convertir la cantidad a entero
            # Convertir el ID de la orden a entero
            order_id = int(row['order_id'])
            # Crea una relación en la base de datos utilizando una consulta Cypher
            query = (
                "MATCH (p:Products {order_id: $order_id}) "
                "MATCH (o:Purchase_Orders {order_id: $order_id}) "
                "CREATE (p)-[:ORDERS {quantity: $quantity}]->(o)"
            )
            # Ejecuta la consulta Cypher con los parámetros proporcionados
            session.run(query, order_id=order_id, quantity=quantity)


# Llama a la función para crear relaciones desde el archivo CSV
create_product_purchase_relationships_from_csv('order_details.csv')
