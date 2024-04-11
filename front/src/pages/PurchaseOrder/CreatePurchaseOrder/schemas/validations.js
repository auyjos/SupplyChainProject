import * as Yup from "yup";
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
    }
} = checkout;

const validations = Yup.object().shape();

export default validations;