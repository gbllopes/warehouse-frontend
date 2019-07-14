import { LOGIN } from "../constants/login";

export default (state = {logado: false}, action) =>{
  switch(action.type){
    case LOGIN:
      return {...state, logado: action.payload.isAutenticado, email: action.payload.user_name };
    default:
      return state;
  }
}
