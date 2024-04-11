import checkout from "./form";

const {
    formField: {
        part_id,
        make,
        nsn,
        market_price,
        list_price,
        supplier,

        description,
        model,
        location,
        tariff_code,

        amount,
        min_amount,
        max_amount,
        type,
        u_m,
        weight,
        weight_type,

        note,
        instalation_note,
        serialized,
        life_limited,
        utilization
    }
} = checkout;

export const initialValues = {
    [part_id.name]:"",
    [make.name]:"",
    [nsn.name]:"",
    [market_price.name]:"",
    [list_price.name]:"",
    [supplier.name]:{label: "", id: ""},
    [description.name]:"",
    [model.name]:"",
    [location.name]:"",
    [tariff_code.name]:"",
    [amount.name]:"",
    [min_amount.name]:"",
    [max_amount.name]:"",
    [type.name]:"",
    [u_m.name]:"",
    [weight.name]:"",
    [weight_type.name]:"",
    [note.name]:"",
    [instalation_note.name]:"",
    [serialized.name]:false,
    [life_limited.name]:false,
    [utilization.name]:"CS",
};

export const initialValuesFromObj = (obj) => {
    let resp = {
        [part_id.name]:obj.part_id,
        [make.name]:obj.make,
        [nsn.name]:obj.nsn,
        [market_price.name]:obj.market_price,
        [list_price.name]:obj.list_price,
        [supplier.name]: {label: obj.supplier.Company || "", id: obj.supplier.id || ""},
        [description.name]:obj.description,
        [model.name]:obj.model,
        [location.name]:obj.location,
        [tariff_code.name]:obj.tariff_code,
        [amount.name]:obj.amount,
        [min_amount.name]:obj.min_amount,
        [max_amount.name]:obj.max_amount,
        [type.name]:obj.type,
        [u_m.name]:obj.u_m,
        [weight.name]:obj.weight,
        [weight_type.name]:obj.weight_type,
        [note.name]:obj.note,
        [instalation_note.name]:obj.instalation_note,
        [serialized.name]:obj.serialized,
        [life_limited.name]:obj.life_limited,
        [utilization.name]:obj.utilization,
    }
    return resp;
}