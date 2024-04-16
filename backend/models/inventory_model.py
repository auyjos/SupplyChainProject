from neomodel import config, StructuredNode, StringProperty, IntegerProperty, RelationshipFrom, UniqueIdProperty, DateProperty
from uuid import uuid4
from config import DATABASE_URL
# Configuración de la conexión a Neo4j
config.DATABASE_URL = DATABASE_URL


class Inventory(StructuredNode):
    product_id = IntegerProperty(unique_index=True, required=True)
    location = StringProperty()
    quantity = IntegerProperty()
    status = StringProperty()
    update_date = DateProperty()

    RelationshipFrom('Purchase_Orders', 'Contains')
