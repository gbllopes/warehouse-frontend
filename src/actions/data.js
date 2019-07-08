import { LOADED} from "../constants/data";

export const load = (isLoaded) =>{
  return {type: LOADED, payload: isLoaded}
}
