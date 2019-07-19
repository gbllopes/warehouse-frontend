import { ADD_COMPANY } from '../constants/company';
import { rest } from '../authentication/tokenConfig';

export const addCompany = (formValues) => async dispatch =>{
    const response = await rest('').post('/company', {...formValues})

    dispatch({ type: ADD_COMPANY, payload: response.data })
}