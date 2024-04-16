from neomodel import StructuredNode, StringProperty, BooleanProperty, DateProperty, IntegerProperty, RelationshipTo


class Purchase_Orders(StructuredNode):
    order_id = IntegerProperty()
    date = DateProperty()
    delivered = BooleanProperty()
    payment_method = StringProperty()
    products = StringProperty()  # Lista de IDs de productos separados por comas
    status = StringProperty()
    total = IntegerProperty()

    cantidad = RelationshipTo('Inventory', 'Contains')
