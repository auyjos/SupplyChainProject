import * as Yup from "yup";
import checkout from "./form";

const {
    formField: {
        inventory,
        tracker_id,
        serial_number,
        qty,
        u_m,
        cost,
        freight,
        retail,
        location,
        used_state,
        supplier,
        condition,
        base,
        market_price,
        purchase_price,
        total_cost,
        currency,
        sale_price,
        bill_id,
        waybill,
        po_number,
        ps_number,
        expiration_date,
        creation_date,
        register,
        equipment,
        alt_1,
        alt_2,
        alt_3,
        alt_4,
        alt_5,
        currency_from,
        rate,
        control_code,
        adjusted_rate,
        adjusted_market_price,
        adjusted_sale_price,
        adjusted_freight,
        adjusted_total_cost,
        adjusted_total_price,
        file_Logcard,
        file_8130,
        file_FORM1,
        condition_state
    }
} = checkout;

const validations = Yup.object().shape();

export default validations;