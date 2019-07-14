import jwt from 'jsonwebtoken';

export const handlerToken = (access_token) => {
  localStorage.setItem("access_token", access_token);
}

export const tokenDecode = (token) => jwt.decode(token);
