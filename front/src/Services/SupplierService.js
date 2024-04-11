
import { doDelete, doGet, doPatch, doPost } from '../utils/api';


const token = "321f62017eca8e1477420f48ce3faea32b07092a";

export const getDefaultObject = () => {
    return (
        {
            "Company": "",
            "address": "",
            "approved": false,
            "city": "",
            "state": "",
            "zip_code": "",
            "phone": "",
            "contact": ""
        }
    )
}

export const getSuppliers = (page, filter, value) => {
    let filterStr = filter != null && value !== undefined ? "&".concat(filter.concat("=".concat(value))) : "";
    let route = "/providers/?".concat("page=".concat(page)).concat(filterStr)

    return doGet(route);
}

export const getSuppliersList = () => {
    let route = "/providers/get_suppliers_list";
    return doGet(route);
}

export const addSuppliers = (data) => {
    let route = "/providers/"
    let headers = {"Content-Type": "multipart/form-data" }
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if (key === "approved"){
            const str = data[key].toString();
            const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            console.log(str2);
            formData.append(key, str2)
        }
        else{
            if(data[key] != null && data[key] !== ""){
                formData.append(key, data[key])
            }
        }
    });
    return doPost(route, formData, headers);
}

export const getSupplier = (id) => {
    let route = "/providers/".concat(id)
    return doGet(route);
}

export const deleteSupplier = (id) => {
    let route = "/providers/".concat(id)
    return doDelete(route)
}

export const updateSupplier = (data, id) => {
    let route = "/providers/update_provider".concat(id).concat("/")
    let headers = {"Content-Type": "multipart/form-data" }
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if (key === "approved"){
            const str = data[key].toString();
            const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            console.log(str2);
            formData.append(key, str2)
        }
        else{
            if(data[key] != null && data[key] !== ""){
                formData.append(key, data[key])
            }
        }
    });
    return doPatch(route, formData, headers);
}

export const exportSupliers = () =>{
    let route = "/providers/export";
    return doGet(route);
}