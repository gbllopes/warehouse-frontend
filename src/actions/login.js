import { rest } from '../authentication/tokenConfig';
import  { handlerToken, tokenDecode } from '../authentication/oauthHandler';

import { ENDPOINT } from '../constants/token';
import {AUTHENTICATED, NOT_AUTHENTICATED} from '../constants/login'

export const autenticarUsuario = usuario => async dispatch =>{
  try{
    const GET_TOKEN = `${ENDPOINT}/oauth/token`;
    const body = `client=warehouse&username=${usuario.email}&password=${usuario.password}&grant_type=password`
    const response = await rest(GET_TOKEN).post(GET_TOKEN, body);
    if(response.status === 200){
      handlerToken(response.data.access_token);
      const dados = tokenDecode(response.data.access_token, {complete: true});
      dados.isAutenticado = true;
      return dispatch({type: AUTHENTICATED, payload: dados});
    }

  }catch(e){
    return dispatch({type: NOT_AUTHENTICATED, payload: "Senha ou email estão incorretos"})
  }

}
