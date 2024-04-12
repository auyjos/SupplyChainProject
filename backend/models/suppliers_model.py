from neomodel import config, StructuredNode, StringProperty, IntegerProperty, RelationshipFrom, UniqueIdProperty
from uuid import uuid4
from config import DATABASE_URL
# Configuración de la conexión a Neo4j
config.DATABASE_URL = DATABASE_URL

# Definición de modelos de datos con Neomodel


class Suppliers(StructuredNode):
    supplier_id = IntegerProperty()
    name = StringProperty()
    address = StringProperty()
    phone = StringProperty()
    country = StringProperty()
    reputation = IntegerProperty()
    contact = StringProperty()
    email = StringProperty()
    website = StringProperty()

    # Relación de proveedor con productos (si es relevante en tu caso)
    products = RelationshipFrom('Products', 'SUPPLIES')
