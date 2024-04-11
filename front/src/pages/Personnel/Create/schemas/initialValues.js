import checkout from "./form";

const {
    formField: {
        name, dpi, phone, email, role, boss, hired, hired_date,
    }
} = checkout;

export const initialValues = {
    [name.name]: "",
    [dpi.name]: "",
    [phone.name]: "",
    [email.name]: "",
    [role.name]: "",
    [boss.name]: "",
    [hired.name]: "",
    [hired_date.name]: "",
   
}

export const initialValuesFromObj = (obj) => {
    return {
        [name.name]: obj.name,
        [dpi.name]: obj.dpi,
        [phone.name]: obj.phone,
        [email.name]: obj.email,
        [role.name]: obj.role,
        [boss.name]: obj.boss,
        [hired.name]: obj.hired,
        [hired_date.name]: obj.hired_date,
        
    }
}
