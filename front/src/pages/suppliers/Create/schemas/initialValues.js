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

export const initialValues = {
  [Company.name]: "",
  [address.name]: "",
  [city.name]: "",
  [state.name]: "",
  [zip_code.name]: "",
  [contact.name]: "",
  [phone.name]: "",
  [approved.name]: false,
  
};

export const initialValuesFromObj = (obj) => {
  let resp = {
    [Company.name]: obj.Company,
    [address.name]: obj.address,
    [city.name]: obj.city,
    [state.name]: obj.state,
    [zip_code.name]: obj.zip_code,
    [contact.name]: obj.contact,
    [phone.name]: obj.phone,
    [approved.name]: obj.approved,
  }
  return resp
}
