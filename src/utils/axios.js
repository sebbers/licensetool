import axios from 'axios';
const instance = axios.create();

instance.interceptors.request.use(
    config => {
        const user = JSON.parse(localStorage.getItem('user'));
        const { token } = user || '';
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
});


instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { config: originalRequest } = error;
        if (error.response.status === 401 && !originalRequest._retry) {
            const user = JSON.parse(localStorage.getItem('user'));
            const { refresh } = user || '';
            axios.defaults.headers.common['Authorization'] = `Bearer ${refresh}`;
            return instance(originalRequest);
        }
        return Promise.reject(error);
});


export default instance;
