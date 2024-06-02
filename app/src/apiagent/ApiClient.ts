import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

const ApiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const _get = (url: string, config = {}) => {
    return ApiClient.get(url, config);
};

const _delete = (url: string, config = {}) => {
    return ApiClient.delete(url, config);
};

const _put = (url: string, data = {}, config = {}) => {
    return ApiClient.put(url, data, config);
};

const _post = (url: string, data = {}, config = {}) => {
    return ApiClient.post(url, data, config);
};

export { _get, _delete, _put, _post };