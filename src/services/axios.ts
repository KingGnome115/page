import axios, {AxiosInstance} from 'axios'

const axiosI: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosI