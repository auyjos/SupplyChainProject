import checkout from "./form";

const {
    formField: {
        addressedTo,
        orderFrom,
        shipTo,
        billTo,
        your_reference,
        ship_via,
        pbh_contract,
        supplier,
        default_control_code,
        currency,
        default_expected_date,
        aog,
        reference,
    }
} = checkout;

export const initialValues = {
    [addressedTo.name]:"",
    [orderFrom.name]:"",
    [shipTo.name]:"",
    [billTo.name]:"",
    [your_reference.name]:"",
    [ship_via.name]:"",
    [pbh_contract.name]:"",
    [supplier.name]:{label: "", id: ""},
    [default_control_code.name]:"",
    [currency.name]:"",
    [default_expected_date.name]: new Date().getFullYear() + "-" + ( new Date().getMonth() < 10 ? ("0" + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1) ) + "-" + ( new Date().getDate() < 10 ? ("0" + new Date().getDate()) : new Date().getDate() ) ,
    [aog.name]:false,
    [reference.name]: "",
}

export const initialValuesFromObj = (obj) => {
    return {
        [addressedTo.name]:obj.addressedTo,
        [orderFrom.name]:obj.orderFrom,
        [shipTo.name]:obj.shipTo,
        [billTo.name]:obj.billTo,
        [your_reference.name]:obj.your_reference,
        [ship_via.name]:obj.ship_via,
        [pbh_contract.name]:obj.pbh_contract,
        [supplier.name]:{label: obj.supplier.Company || "", id: obj.supplier.id || ""},
        [default_control_code.name]:obj.default_control_code,
        [currency.name]:obj.currency,
        [default_expected_date.name]:obj.default_expected_date,
        [aog.name]:obj.aog,
        [reference.name]: obj.reference
    }
}