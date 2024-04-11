import { doDelete, doGet, doPatch, doPost } from '../utils/api';
import { getTokenSession } from './authService';

export const getPersonnel = (page, filter, value) => {
    let filterStr = filter != null ? "&".concat(filter.concat("=".concat(value))) : "";
    let route = "/personnel/?"
    console.log(route)
    
    return doGet(route)
}

export const addPersonnel = (data) => {
    let route ="/personnel/";
    
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData);
}

export const deletePersonnel = (id) => {
    let route = "/personnel/".concat(id)
    
    return doDelete(route)
}

export const updatePersonnel = (data, id) => {
    let route = "/personnel/".concat(id).concat("/")
    
    let formData = new FormData();
    Object.keys(data).forEach(key => {
                if(data[key] != null && data[key] !== ""){
                    formData.append(key, data[key])
                }
            });
    return doPatch(route, formData);
}