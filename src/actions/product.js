
import { CURRENT_ADD } from '../constants/product';
export const productsCurrentAdd = (formValues) => dispatch =>{
    dispatch({ type: CURRENT_ADD , payload: formValues });
} 