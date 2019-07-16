import jwt from "jsonwebtoken";

export const handlerToken = access_token => {
    localStorage.setItem("access_token", access_token);
};

export const tokenDecode = token => jwt.decode(token);

export const isTokenExpired = access_token => {
    const tokenDecoded = jwt.decode(access_token);
    if (tokenDecoded != null) {
        if (new Date(tokenDecoded.exp) < new Date()) {
            return false;
        }
        return true;
    }
    return true;
};
