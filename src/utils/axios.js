import LocalStorage from '../services/localStorage';
import history from './history';
import axios from 'axios';
const instance = axios.create();

instance.interceptors.request.use(
    config => {
        const token = LocalStorage.getAccessToken();
        config.headers['Authorization'] = 'Bearer ' + token;
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
);


instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { config: originalRequest } = error;
        if (error.response.status === 401 && originalRequest.url.endsWith('v1/admin')) {
            history.push('/login');
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = LocalStorage.getRefreshToken();
            return axios.get('https://license-test.digitalanarchy.com/api/v1/admin/refresh',
                {
                    headers: {
                      'Authorization': `Bearer ${refreshToken}`
                    }
                })
                .then(response => {
                    if (response.data) {
                        LocalStorage.setToken(response.data);
                        instance.defaults.headers.common['Authorization'] = `Bearer ${LocalStorage.getAccessToken()}`;
                        return instance(originalRequest);
                      }

                })
        }
        return Promise.reject(error);
    }
);


export default instance;
