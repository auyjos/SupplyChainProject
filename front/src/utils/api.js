import axios from "axios";

const baseURL = "http://localhost:8000"
const defaulHeaders = {'Content-Type': 'application/json',}

export const doGet = (route, headers, params) => {
    let url = baseURL.concat(route);
    return axios.get(url, { params: params, headers: { ...defaulHeaders, ...headers } });
}

export const doPost  = (route, body, headers) => {
    return axios.post(baseURL.concat(route), body, { headers: headers });
}

export const doPut = (route, body, headers) => {
    return axios.put(baseURL.concat(route), body, { headers: headers });
}

export const doPatch = (route, body, headers) => {
    return axios.patch(baseURL.concat(route), body, { headers: headers });
}

export const doDelete = (route, headers) => {
    return axios.delete(baseURL.concat(route), {headers: headers})
}
