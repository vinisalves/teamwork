import axios from "axios";
const baseApi = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API
});

export default baseApi;
