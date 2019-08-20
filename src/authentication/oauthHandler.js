import jwt from "jsonwebtoken";
import history from '../history'

export const handlerToken = access_token => {
    localStorage.setItem("access_token", access_token);
};

export const tokenDecode = token => jwt.decode(token);

export const isTokenExpired = access_token => {
    const tokenDecoded = jwt.decode(access_token);
    if (tokenDecoded) {
        if (new Date(tokenDecoded.exp * 1000) > new Date()) {
            return false;
        }
        return true;
    }
    return true;
};

export const logout = () =>{
    localStorage.removeItem("access_token");
    history.push("/login")
}
