import checkout from "./form";

const {
    formField: {
        name,
        authorization,
        initial
    }
} = checkout;

export const initialValues = {
    [name.name]:"",
    [authorization.name]:"",
    [initial.name]:"",
};

export const initialValuesFromObj = (obj) => {
    let resp = {
        [name.name]:obj.name,
        [authorization.name]:obj.authorization,
        [initial.name]:obj.initial
    }
    return resp;
}