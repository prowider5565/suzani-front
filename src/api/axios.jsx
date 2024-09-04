import axios from "axios";
import { clearLS, getFromLS } from "../utils/localStorage";

export const usrImg = "https://api.suzani-abdulhakim.uz";
export const instance = axios.create({
  // baseURL: "https://dummyjson.com/",
  // baseURL: "https://medtexnam.uz/shop/api/",
  baseURL: "https://api.suzani-abdulhakim.uz/",
  // headers: {
  //     "Content-Type": "application/json",
  // },
});

instance.interceptors.request.use(
  (config) => {
    const token = getFromLS("a-token");
    // console.log(config);
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("error");
    return Promise.reject(error);
  }
);
