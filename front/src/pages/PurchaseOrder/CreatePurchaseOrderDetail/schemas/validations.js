import * as Yup from "yup";
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

const validations = Yup.object().shape();

export default validations;