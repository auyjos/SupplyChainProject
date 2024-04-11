
import { doDelete, doGet, doPatch, doPost } from '../utils/api';



export const getDefaultObject = () => {
    return (
        {
            "nit": "",
            "nombre": "",
            "direccion": "",
            "telefono": "",
            "email": "",
            "responsable": "",
    
        }
    )
}

export const getInvoices = (page, filter, value, sts) => {
    let filterStr = filter != null ? "&".concat(filter.concat("=".concat(value))) : "";
    let statusFilter = sts != null ? "&status=".concat(sts) : ""; // Agregar el filtro de estado
    let route = "/invoices/?".concat("page=".concat(page)).concat(filterStr).concat(statusFilter);
    return doGet(route);
}

export const getInvoice = (id) => {
    let route = '/invoice/'.concat(id);
    return doGet(route);
}

export const addClient = (data) => {
    let route = "/client/"
    let headers = { "Content-Type": "multipart/form-data" }
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData, headers);
}

export const getClient = (id) => {
    let route = "/client/".concat(id)
    
    return doGet(route);
}

export const getClientList = () => {
    let route = "/client/get_clients_list/";
    
    return doGet(route);
}

export const deleteClient = (id) => {
    let route = "/invoices/".concat(id).concat("/delete/")
    
    return doDelete(route)
}

export const anularFactura = (id) => {
    let route = "/invoices/anular/"
    
    let formData = new FormData();
    formData.append('id', id);
    
    return doPost(route, formData);
}


export const anularFacturaBulk = (id) => {
    let route = "/bulk_anular_facturas/"
    
    let data = {
        invoice_ids: [id]
      };
    
    return doPost(route, data);
}

export const updateClient = (data, id) => {
    let route = "/client/".concat(id).concat("/")
    
    let formData = new FormData();
    Object.keys(data).forEach(key => {
                if(data[key] != null && data[key] !== ""){
                    formData.append(key, data[key])
                }
            });
    return doPatch(route, formData);
}

export const exportClient = () =>{
    let route = "/client/export";
    ;
    return doGet(route);
}