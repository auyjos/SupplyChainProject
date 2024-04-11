/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import * as Yup from "yup";
import checkout from "./form";

const {
  formField: {
    Company,
    address,
    approved,
    city,
    state,
    zip_code,
    phone,
    contact,
},
} = checkout;

const validations = [
  Yup.object().shape({
    [Company.name]: Yup.string().required(Company.errorMsg),
    [phone.name]: Yup.string().required(phone.errorMsg),
    [contact.name]: Yup.string().required(contact.errorMsg),
  }),
  Yup.object().shape({
    [address.name]: Yup.string().required(address.errorMsg),
    [city.name]: Yup.string().required(city.errorMsg),
    [state.name]: Yup.string().required(state.errorMsg),
    [zip_code.name]: Yup.string().required(zip_code.errorMsg),
    [contact.name]: Yup.string().required(contact.errorMsg),
  }),
];

export default validations;
