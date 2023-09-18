import {SESSION} from './constants';

export const setSession =  (name = '', data = '') => {
  return  localStorage.setItem(name, data);
};
export const getSession =  (name = '') => {
  return localStorage.getItem(name);
};
export const getToken = () => {
  return localStorage.getItem(SESSION.ACCESS_TOKEN);
};

export const clearSession =  () => {
  localStorage.clear();
};
