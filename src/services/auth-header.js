import LocalStorage from './localStorage';

export default function authHeader() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const token = LocalStorage.getAccessToken();
  return { 'Authorization': 'Bearer ' + token };
  // if (token) {
    
  // } else {
  //   return {};
  // }
}