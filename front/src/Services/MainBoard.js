import { doDelete, doGet, doPatch, doPost } from '../utils/api';
import { getTokenSession } from './authService';

export const addDeffect = (data) => {
    let route ="/defects/";
    let headers = { 'Authorization': "Token ".concat(getTokenSession()) }
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData, headers);
}

export const getAllDeffects = (page, aircraftId) => {
    let route = "/defects/?page=".concat(page) + "&aircraft_id=".concat(aircraftId);
    let headers = { 'Authorization': "Token ".concat(getTokenSession()) }
    return doGet(route, headers);
}

export const addLogs= (data) => {
    let route ="/flight/";
    let headers = { 'Authorization': "Token ".concat(getTokenSession()) }
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData, headers);
}

export const getAllLogs = (page, aircraftId) => {
    let route = "/flight/?page=".concat(page) + "&aircraft_id=".concat(aircraftId);
    let headers = { 'Authorization': "Token ".concat(getTokenSession()) }
    return doGet(route, headers);
}


export const getPreviousFlight = (aircraftId) => {
    let route = "/flight/get_flight_log/?" + "aircraft_id=".concat(aircraftId);
    let headers = { 'Authorization': "Token ".concat(getTokenSession()) }
    return doGet(route, headers);
}


export const getTasks = (page, aircraftId) => {
    let route = "/task/?ship__id=".concat(aircraftId);
    let headers = { 'Authorization': "Token ".concat(getTokenSession()) }
    return doGet(route, headers);
}

export const addTask = (data) => {
    let route = "/task/";
    let headers = { 'Authorization': "Token ".concat(getTokenSession()) }
    let formData = new FormData();
    Object.keys(data).forEach(key => {
        if(data[key] != null && data[key] !== ""){
            formData.append(key, data[key])
        }
    });
    return doPost(route, formData, headers);
}