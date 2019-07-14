import { rest } from '../authentication/tokenConfig';
import  { handlerToken, tokenDecode } from '../authentication/oauthHandler';

import { ENDPOINT } from '../constants/token';
import {LOGIN} from '../constants/login'
import history from '../history';

export const autenticarUsuario = usuario => async dispatch =>{
  const GET_TOKEN = `${ENDPOINT}/oauth/token`;
  const body = `client=warehouse&username=${usuario.email}&password=${usuario.password}&grant_type=password`
  const response = await rest(GET_TOKEN).post(GET_TOKEN, body);
  if(response.status === 200){
    handlerToken(response.data.access_token);
    const dados = tokenDecode(response.data.access_token);
    dados.isAutenticado = true;
    history.push("/");
    return dispatch({type: LOGIN, payload: dados});
  }
}
