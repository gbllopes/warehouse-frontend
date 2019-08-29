import Axios from 'axios';
import { ENDPOINT } from '../constants/token';

export const rest = (path) =>  {

  if(path === 'http://127.0.0.1:8000/oauth/token'){
    return Axios.create({
      baseURL: 'http://127.0.0.1:8000/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;',
      }
    })
  }
  return Axios.create({
    baseURL: ENDPOINT,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
    }
  })
}
