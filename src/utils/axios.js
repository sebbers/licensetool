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
        Promise.reject(error);
    }
);


instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        debugger
        const { config: originalRequest } = error;
        console.log(`originalRequest.url: ${originalRequest.url}`)
        debugger
        if (error.response.status === 401 && originalRequest.url.endsWith('v1/admin')) {
            debugger
            history.push('/login');
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            // const user = JSON.parse(localStorage.getItem('user'));
            // const { refresh } = user || '';
            // axios.defaults.headers.common['Authorization'] = `Bearer ${refresh}`;
            // return instance(originalReq  uest);
            debugger
            originalRequest._retry = true;
            const refreshToken = LocalStorage.getRefreshToken();
            debugger
            return axios.get('/api/v1/admin/',
                {
                    headers: {
                      'Authorization': `Bearer ${refreshToken}`
                    }
                })
                .then(response => {
                    debugger
                    if (response.data) {
                        debugger
                        // localStorage.setItem("user", JSON.stringify(response.data));
                        LocalStorage.setToken(response.data);
                        debugger
                        instance.defaults.headers.common['Authorization'] = `Bearer ${LocalStorage.getAccessToken()}`;
                        debugger
                        // return response.data.token;
                        return instance(originalRequest);
                      }

                    // if (res.status === 201) {
                    //     localStorageService.setToken(res.data);
                    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                    //     return axios(originalRequest);
                    // }
                })
        }
        return Promise.reject(error);
    }
);


export default instance;
