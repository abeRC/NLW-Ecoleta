import axios from "axios";

/*Isto nos permite usar o nosso back-end!*/
const api = axios.create({
    baseURL: "http://localhost:3333"
});

export default api;