import checkout from "./form";

const {
    formField: {
        purchase_order,
        inventory,
        description,
        cc,
        condition,
        u_m,
        qty,
        quote,
        disc,
        net,
        total,
    }
} = checkout;

export const initialValues = {
    [purchase_order.name]:"",
    [inventory.name]:"",
    [description.name]:"",
    [cc.name]:"",
    [condition.name]:"",
    [u_m.name]:"",
    [qty.name]:0,
    [quote.name]:0,
    [disc.name]:0,
    [net.name]:0,
    [total.name]:0,
}

export const initialValuesFromObj = (obj) => {
    return {
        [purchase_order.name]:obj.purchase_order.id || "",
        [inventory.name]:obj.inventory.id || "",
        [description.name]:obj.description || "",
        [cc.name]:obj.cc || "",
        [condition.name]:obj.condition || "",
        [u_m.name]:obj.u_m || "",
        [qty.name]:obj.qty || 0,
        [quote.name]:obj.quote || 0,
        [disc.name]:obj.disc || 0,
        [net.name]:obj.net || 0,
        [total.name]:obj.total || 0,
    }
}
