import { doDelete, doGet, doPatch, doPost } from '../utils/api';


export const getUSedStateLabel = (id) => {
    let label = "";
    switch (id) {
        case "I":
            label = "Inventory"
            break;
        case "S":
            label = "Scrap"
            break;
        case "Q":
            label = "Quarentine"
            break;
        case "A":
            label = "Active"
            break;
        default:
            label = "Unknown State"
            break;
    }
    return label;
}

//Inventory
export const getUniquePieces = (page, filter, value) => {
    let filterStr = filter != null ? "&".concat(filter.concat("=".concat(value))) : "";
    let route = "/inventory/?".concat("page=".concat(page)).concat(filterStr);
    
    return doGet(route)
}

export const addItem = (data) => {
    let route = "/inventory/";
    
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData);
}
export const getItem = (id) => {
    let route = "/inventory/".concat(id);
    ;
    return doGet(route);
}
export const updateItem = (id, data) => {
    let route = "/inventory/".concat(id.concat("/"));
    
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

export const getAllInventory = () => {
    let route = "/inventory/get_inventory_list/"
    ;
    return doGet(route);
}

//Inventory Detail

export const getPieces = (page, inventoryId) => {
    let route = "/inventory_detail/?".concat("page=".concat(page).concat("&inventory_id=").concat(inventoryId)).concat("&used_state=I")
    
    return doGet(route)
}

export const addPiece = (data) => {
    let route = "/inventory_detail/";
    
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData);
}

export const getPiece = (id) => {
    let route = "/inventory_detail/".concat(id);
    
    return doGet(route)
}

export const updatePiece = (id, data) => {
    let route = "/inventory_detail/".concat(id.concat("/"));
    
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

export const getItems = (page, filter, value) =>{
    let filterStr = filter != null ? "&".concat(filter.concat("=".concat(value))) : "";
    let route = "/inventory_detail/?".concat("page=".concat(page)).concat(filterStr);
    ;
    return doGet(route);
}   

export const getQuarantine = (page, filter, value) =>{
    let filterStr = filter != null ? "&".concat(filter.concat("=".concat(value))) : "";
    let route = "/inventory_detail/?".concat("page=".concat(page)).concat("&used_state=Q").concat(filterStr);
    ;
    return doGet(route);
}   

export const getScrap = (page, filter, value) => {
    let filterStr = filter != null ? "&".concat(filter.concat("=".concat(value))) : "";
    let route = "/inventory_detail/?".concat("page=".concat(page)).concat("&used_state=S").concat(filterStr);
    ;
    return doGet(route);
}

export const getRepair = (page,filter, value) => {
    let filterStr = filter != null ? "&".concat(filter.concat("=".concat(value))) : "";
    let route = "/inventory_detail/?".concat("page=".concat(page)).concat("&used_state=R").concat(filterStr);
    ;
    return doGet(route);
}

export const deleteItem = (id) => {
    let route = "/inventory_detail/".concat(id);
    ;
    return doDelete(route);
}

export const sendToScrap = (id) => {
    let route = "/inventory_detail/change_item_status/"
    ;
    let formData = new FormData();
    formData.append("id", id);
    formData.append("used_state", "S");
    return doPost(route, formData);
}

export const sendToQuarantine = (id) => {
    let route = "/inventory_detail/change_item_status/"
    ;
    let formData = new FormData();
    formData.append("id", id);
    formData.append("used_state", "Q");
    return doPost(route, formData);
}

export const sendToInventory = (id) => {
    let route = "/inventory_detail/change_item_status/"
    ;
    let formData = new FormData();
    formData.append("id", id);
    formData.append("used_state", "I");
    return doPost(route, formData);
}

export const sendToRepair = (id) => {
    let route = "/inventory_detail/change_item_status/"
    ;
    let formData = new FormData();
    formData.append("id", id);
    formData.append("used_state", "R");
    return doPost(route, formData);
}

export const  getMissingExpiration = (page, filter, value) => {
    let filterStr = filter != null ? "&".concat(filter.concat("=".concat(value))) : "";
    let route = "/inventory_detail/get_no_expiration_date/?".concat("page=".concat(page)).concat(filterStr);
    ;
    return doGet(route);
}

export const getHistory = (page, item) => {
    let route = "/inventory_history/?".concat("page=".concat(page)).concat("&inventory_detail=".concat(item))
    ;
    return doGet(route);
}

export const getExpiredItems = (page) => {
    let route = "/inventory_detail/get_expired_items/";
    ;
    return doGet(route);
}

export const getItemsToExpire = (page) => {
    let route = "/inventory_detail/get_to_expire_items/";
    ;
    return doGet(route);
}

export const exportInventory = () =>{
    let route = "/inventory_detail/export/?filename=inventory_detail.csv";
    ;
    return doGet(route);
}
export const getItemList = () => {
    let route = "/inventory_detail/get_list/";
    
    return doGet(route);
}