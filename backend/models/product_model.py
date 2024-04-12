from neomodel import config, StructuredNode, StringProperty, IntegerProperty, RelationshipFrom, UniqueIdProperty, RelationshipTo
from uuid import uuid4
from config import DATABASE_URL
# Configuración de la conexión a Neo4j
# Cambia esto según tu configuración
config.DATABASE_URL = DATABASE_URL

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
  # Relación con las rutas de transporte a través de la relación Order_Route
    Order_Route = RelationshipTo('Products', 'Transport Routes')
