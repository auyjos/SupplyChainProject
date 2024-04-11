import { doDelete, doGet, doPatch, doPost } from '../utils/api';
import { getTokenSession } from './authService';

export const getPO = (page, filter, value) => {
    let filterStr = filter != null ? "&".concat(filter.concat("=".concat(value))) : "";
    let route = "/purchase_order/?".concat("page=".concat(page)).concat(filterStr);
    console.log(route)
    
    return doGet(route)
}

export const addPO = (data) => {
    let route ="/purchase_order/";
    
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData);
}

export const getPOByID = (id) => {
    let route ="/purchase_order/".concat(id);
    
    return doGet(route);
}

export const getPODetail = (page, POId) => {
    let route = "/purchase_detail/?".concat("page=".concat(page).concat("&purchase_order_id=").concat(POId))
    
    return doGet(route)
}

export const getReceived = (page, received) => {
    let route = "/purchase_detail/?".concat("page=".concat(page).concat("&received=").concat(received))
    
    return doGet(route)
}

export const addPODetail = (data, poId, inventory) => {
    let route ="/purchase_detail/";
    
    let formData = new FormData();
    formData.append("purchase_order", poId)
    formData.append('inventory', inventory)
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData);
}

export const deletePO = (id) => {
    let route ="/purchase_order/".concat(id);
    
    return doDelete(route)
}

export const changeLockPO = (id, value) => {
    let route ="/purchase_order/".concat(id).concat("/");
    
    let formData = new FormData();
    formData.append("locked", value)
    return doPatch(route, formData)
}

export const updatePO = (id, data) => {
    let route ="/purchase_order/".concat(id).concat("/");
    
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(key === "supplier"){
            if(typeof data[key] === "object"){
                formData.append(key, data[key].id);
            }
        }else if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPatch(route, formData);
}

export const addPOItem = (poDetail) => {
    let route = "/purchase_detail/export_to_inventory_detail/"  
    
    let formData = new FormData();
    formData.append("id", poDetail)
    return doPost(route, formData)
}

export const exportDetailToInventory = (poDetail, data, qty) => {
    let route = "/purchase_detail/export_to_inventory_detail/"
    
    let formData = new FormData();
    formData.append("id", poDetail);
    formData.append("to_receive", qty);
    Object.keys(data).forEach(key => {
        if(key === "supplier"){
            if(typeof data[key] === "object"){
                formData.append(key, data[key].id);
            }
        }else if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData);
}

export const getPODetailById = (id) => {
    let route = "/purchase_detail/".concat(id).concat("/")
    
    return doGet(route);
}

export const updatePODetail = (id,data) => {
    let route = "/purchase_detail/".concat(id).concat("/")
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPatch(route, formData);
}

export const deletePODetail = (id) => {
    let route ="/purchase_detail/".concat(id);
    
    return doDelete(route)
}

export const getPONotes = (id) => {
    let route ="/purchase_note/?purchase_order__id=".concat(id);
    
    return doGet(route);
}

export const createNote = (data) => {
    let route ="/purchase_note/"
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData)
}