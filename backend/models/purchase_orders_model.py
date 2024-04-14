from neomodel import StructuredNode, StringProperty, BooleanProperty, DateProperty, IntegerProperty
from config import DATABASE_URL
# Configuración de la conexión a Neo4j
config.DATABASE_URL = DATABASE_URL


class Purchase_Orders(StructuredNode):
    order_id = IntegerProperty()
    date = DateProperty()
    delivered = BooleanProperty()
    payment_method = StringProperty()
    products = StringProperty()  # Lista de IDs de productos separados por comas
    status = StringProperty()
    total = IntegerProperty()
