import axios from "axios";
export const axiosInstance = axios.create({
    baseURL : 'api.openweathermap.org/data/2.5',
    params: {
        q : "", 
        lat : 0.00,
        lon : 0.00,
        appid: 'e8a604118a233d4dfafc5dc3d1964315'
    }
})