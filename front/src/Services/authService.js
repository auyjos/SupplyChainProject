import { doDelete, doGet, doPost } from "../utils/api";

export const getDefaultSignInObj = () => {
  return {
    email: "",
    password: "",
  };
};

export const getRolLabel = (r) => {
  let rolLabel;
  switch (r) {
    case "A":
      rolLabel = "Admin";
      break;
    case "S":
      rolLabel = "Supervisor";
      break;
  }
  return rolLabel;
};

export const checkSession = () => {
  return window.localStorage.getItem("isAuthenticated");
};

export const getSessionData = () => {
  return JSON.parse(window.localStorage.getItem("data"));
};

export const getCurrentRol = () => {
  return JSON.parse(window.localStorage.getItem("data").role);
};

export const saveSession = (data) => {
  
  window.localStorage.setItem("isAuthenticated", true);
  window.localStorage.setItem("data", JSON.stringify(data));
  console.log(JSON.stringify(data))
};

export const signIn = (data) => {
  console.log(data);
  let route = "/signin/";
  let headers = { "Content-Type": "application/json" };
  return doPost(route, data, headers);
};

export const signUp = (data) => {
  let route = "/users/create/";
  let formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return doPost(route, formData);
};

export const getAllUsers = (page, filter, value) => {
  let filterStr =
    filter != null ? "&".concat(filter.concat("=".concat(value))) : "";
  let route = "/users/?".concat("page=".concat(page)).concat(filterStr);
  return doGet(route);
};

export const signOut = () => {
  window.localStorage.clear();
};
