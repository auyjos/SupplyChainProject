from neomodel import config, StructuredNode, StringProperty, IntegerProperty, RelationshipFrom, UniqueIdProperty
from uuid import uuid4

# Configuración de la conexión a Neo4j
# Cambia esto según tu configuración
config.DATABASE_URL = 'neo4j+s://neo4j:uPw1SolGY1Db1l65qYVPj9KN9JuFPtNxOs5SD9-r22s@27489c7e.databases.neo4j.io:7687'

# Definición de modelos de datos con Neomodel


class Products(StructuredNode):
    # Utiliza un nombre distinto de 'id' para la propiedad
    product_id = IntegerProperty()
    # Define las demás propiedades de acuerdo a tus necesidades
    name = StringProperty()
    type = StringProperty()
    stock = IntegerProperty()
    brand = StringProperty()
    description = StringProperty()


print(Products)  # Imprime el modelo de d


class Supplier(StructuredNode):
    name = StringProperty()
    address = StringProperty()
    phone = StringProperty()
    country = StringProperty()
    reputation = IntegerProperty()
    contact = StringProperty()
    email = StringProperty()
    website = StringProperty()


class TransportRoute(StructuredNode):
    origin = StringProperty()
    destination = StringProperty()
    cost = IntegerProperty()
    estimated_time = StringProperty()
    company = StringProperty()

# Ruta para obtener todos los productos
