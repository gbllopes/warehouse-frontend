import Axios from 'axios';
import { ENDPOINT } from '../constants/token';

export const rest = (path) =>  {

  if(path === `${ENDPOINT}/oauth/token`){
    return Axios.create({
      baseURL: ENDPOINT,
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
