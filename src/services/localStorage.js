const _getAccessToken = () => {
    return localStorage.getItem('token');
}

const _getRefreshToken = () => {
    return localStorage.getItem('refresh');
}

const _getUser = () => {
    return localStorage.getItem('user');
}

const _setToken = (tokenObj) => {
    localStorage.setItem('token', tokenObj.token);
    localStorage.setItem('refresh', tokenObj.refresh);
}

const _clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
}

const _setUser = (user) => {
    localStorage.setItem('user', user);
}

const _clearUser = () => {
    localStorage.removeItem('user');
}

export default {
   getAccessToken : _getAccessToken,
   getRefreshToken : _getRefreshToken,
   getUser : _getUser,
   setToken : _setToken,
   clearToken : _clearToken,
   setUser : _setUser,
   clearUser : _clearUser,
};