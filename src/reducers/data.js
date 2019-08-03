import { LOADED } from "../constants/data";

export default (loading = true, action) => {
    switch(action.type){
        case LOADED:
            return action.payload;
        default:
            return loading;
    }
}
