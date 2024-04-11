import * as Yup from "yup";
import checkout from "./form";

const {
    formField: {
        part_id,
        make,
        nsn,
        market_price,
        list_price,
        client,
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
        life_limited,utilization
    }
} = checkout;

const validations = Yup.object().shape();

export default validations;