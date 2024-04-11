
import { doDelete, doGet, doPatch, doPost } from '../utils/api';


export const getStaffList = () => {
    let route = "/staff_manager/";

    return doGet(route);
}

export const getStaffById = () => {
    let route = "/staff_manager/";
    return doGet(route);
}
export const addStaff = (data) => {
    let route = "/staff_manager/";
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData);
}

export const updateStaff = (id, data) => {
    let route = "/staff_manager/".concat(id.concat("/"));
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(key === "name" || key === "initial" || key === "authorization" ){
            
            formData.append(key, data[key]);
            
        }else if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPatch(route, formData);
}

export const deleteStaff = (id) => {
    let route = "/staff_manager/".concat(id).concat("/");
    return doDelete(route)
}