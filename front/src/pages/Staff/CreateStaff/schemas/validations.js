import * as Yup from "yup";
import checkout from "./form";

const {
    formField: {
        name,
        authorization,
        initial
    }
} = checkout;

const validations = Yup.object().shape();

export default validations;