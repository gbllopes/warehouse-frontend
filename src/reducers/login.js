import { AUTHENTICATED, NOT_AUTHENTICATED } from "../constants/login";

export default (state = {logado: false, msg: null}, action) =>{
  switch(action.type){
    case AUTHENTICATED:
      return {...state, logado: action.payload.isAutenticado, email: action.payload.user_name };
    case NOT_AUTHENTICATED:
      return {...state, msg: action.payload}
    default:
      return state;
  }
}
