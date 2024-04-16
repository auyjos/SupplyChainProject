from neomodel import StructuredRel, IntegerProperty, FloatProperty, RelationshipFrom


class Contains(StructuredRel):
    cantidad = IntegerProperty()
    precio_unitario = FloatProperty()
    subtotal = FloatProperty()

    cantidad = RelationshipFrom('Inventory', 'Contains')
