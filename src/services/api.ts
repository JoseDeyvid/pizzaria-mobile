import axios from "axios";

const api = axios.create({
    baseURL: "https://pizzariaback.vercel.app"
})

export default api;