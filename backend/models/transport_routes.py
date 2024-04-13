from neomodel import config, StructuredNode, StringProperty, IntegerProperty, RelationshipFrom, UniqueIdProperty
from uuid import uuid4
from config import DATABASE_URL
# Configuración de la conexión a Neo4j
config.DATABASE_URL = DATABASE_URL

# Definición de modelos de datos con Neomodel


class Transport_Routes(StructuredNode):
    transport_route_id = IntegerProperty()
    origin = StringProperty()
    destination = StringProperty()
    cost = IntegerProperty()
    estimated_time = StringProperty()
    company = StringProperty()

# Ruta para obtener todos los productos
